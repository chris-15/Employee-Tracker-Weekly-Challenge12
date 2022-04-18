const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const startPrompt = require("../index");
const { viewDepartment, viewRoles, viewEmployees } = require('./view');

const db = require("../db/connection");

// function to update employee role

updateEmployee = () => {
  console.log("** Updating employee's role! **");

  const sqlEmployee = `SELECT id, first_name, last_name FROM employee`;
  db.query(sqlEmployee, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }

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

        const sqlRole = `SELECT id, title FROM role`;
        db.query(sqlRole, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

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

              updatedEmployeeArr = [rolesAnswer.roles, employeeAnswer.employee];

              const sqlUpdate = `UPDATE employee SET role_id = ? WHERE id = ? `;

              db.query(sqlUpdate, updatedEmployeeArr, (err, result) => {
                if (err) {
                  console.log(err);
                  return;
                }

                viewEmployees();
              });
            });
        });
      });
  });
};

module.exports = updateEmployee;
