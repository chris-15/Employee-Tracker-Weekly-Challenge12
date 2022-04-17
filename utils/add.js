//add a department, add a role, add an employee,

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const startPrompt = require("../index");
const { viewDepartment, viewRoles, viewEmployees } = require("./view");

const db = require("../db/connection");

// fucntion to add a department - name
const addDepartment = () => {
  console.log("** Adding a new department! **");

  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
        validate: (newDepartmentInput) => {
          if (newDepartmentInput) {
            return true;
          } else {
            console.log("Please enter a new department name!");
            return false;
          }
        },
      },
    ])
    .then((answers) => {
      //console.log(answers);

      // query statement to add value into department table
      const sql = `INSERT INTO department (name)
                    VALUES(?)`;
      db.query(sql, answers.newDepartment, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        viewDepartment();
      });
    });
};

// add name, salary, and department

const addRole = () => {
  console.log("** Adding a new role! **");

  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the name of the new role? (Required)",
        validate: (newRoleInput) => {
          if (newRoleInput) {
            return true;
          } else {
            console.log("Please enter a new role name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "roleSalary",
        message:
          "What is the salary of the new role? (Required format: XXXXX.XX",
        validate: (roleSalaryInput) => {
          if (!isNaN(roleSalaryInput)) {
            return true;
          } else {
            console.log("Please enter a salary in the required format!");
            return false;
          }
        },
      },
    ])
    .then((roleAnswers) => {
      // roleAnswers.newRole  roleAnswers.roleSalary
      //console.log(roleAnswers);
      const sqlDept = `SELECT id, name FROM department`;
      db.query(sqlDept, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        //console.log(rows)
        // using map to add a name and value to choices array in the inquirer list prompt
        // the name will display but the value is what is returned in the answer of the prompt
        deptChoices = rows.map(({ name, id }) => {
          return { name: name, value: id };
        });
        //console.log(deptChoices);
        inquirer
          .prompt([
            {
              type: "list",
              name: "newRoleDepartment",
              message: "What department does this belong to?",
              choices: deptChoices,
            },
          ])
          .then((newroleDept) => {
            //console.log(newroleDept)

            // defining new array that holds all the info needed for the new role
            roleInfoArr = [
              roleAnswers.newRole,
              roleAnswers.roleSalary,
              newroleDept.newRoleDepartment,
            ];
            //console.log(roleInfoArr)
            sqlRoleInfo = `INSERT INTO role (title, salary, department_id)
                           VALUES(?, ?, ?)`;

            db.query(sqlRoleInfo, roleInfoArr, (err, result) => {
              if (err) {
                console.log(err);
                return;
              }
              viewRoles();
            });
          });
      });
    });
};

const addEmployee = () => {
  console.log("** Adding a new employee! **");
  // first name, last name, role, and manager
  inquirer.prompt([]);
};

module.exports = {
  addDepartment,
  addRole,
};
