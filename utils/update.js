// packages needed for app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const startPrompt = require("../index");
const { viewDepartment, viewRoles, viewEmployees } = require("./view");

const db = require("../db/connection");

// function to update employee role

updateEmployee = () => {
  console.log("** Updating employee's role! **");

  // query to select the info need from the employee table
  const sqlEmployee = `SELECT id, first_name, last_name FROM employee`;
  db.query(sqlEmployee, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

    //using map to add a name and vlaue to choices array for employees inquirer
    // the name will display but the value is what is returned in the answer of the prompt
    employeeChoices = rows.map(({ id, first_name, last_name }) => {
      return { name: first_name + " " + last_name, value: id };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee's role woulld you like to update?",
          choices: employeeChoices,
        },
      ])
      .then((employeeAnswer) => {
        // console.log(employeeAnswer);
        // employeeAnswer.employee

        // query to select the correct info for the roles
        const sqlRole = `SELECT id, title FROM role`;
        db.query(sqlRole, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          //using map to add a name and vlaue to choices array for roles inquirer
          // the name will display but the value is what is returned in the answer of the prompt
          roleChoices = result.map(({ id, title }) => {
            return { name: title, value: id };
          });

          inquirer
            .prompt([
              {
                type: "list",
                name: "roles",
                message: "Which role do you want to assign to the employee?",
                choices: roleChoices,
              },
            ])
            .then((rolesAnswer) => {
              //console.log(rolesAnswer);
              //rolesAnswer.roles

              // defining new array that holds all the info needed to update employee role
              updatedEmployeeArr = [rolesAnswer.roles, employeeAnswer.employee];

              const sqlUpdate = `UPDATE employee SET role_id = ? WHERE id = ? `;

              // applying query to update the employee info in to the employee table
              db.query(sqlUpdate, updatedEmployeeArr, (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log("** Employee's role has been updated!");
                viewEmployees();
              });
            });
        });
      });
  });
};

module.exports = updateEmployee;
