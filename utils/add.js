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

            // declaring a variable for the sql insert query
            const sqlRoleInfo = `INSERT INTO role (title, salary, department_id)
                           VALUES(?, ?, ?)`;

            // applying query to add the role info in to the role table
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "newFirstName",
        message: "What is the first name of the new employee? (Required)",
        validate: (newFirstNameInput) => {
          if (newFirstNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newLastName",
        message: "What is the last name of the new employee? (Required)",
        validate: (newLastNameInput) => {
          if (newLastNameInput) {
            return true;
          } else {
            console.log("Please enter the employee's last name!");
            return false;
          }
        },
      },
    ])
    .then((employeeName) => {
      //console.log(employeeName);
      // employeeName.newFirstName, employeeName.newLastName
      const sqlRoleSelect = `SELECT id, title FROM role`;
      db.query(sqlRoleSelect, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }

        //console.log(rows);
        roleChoices = rows.map(({ id, title }) => {
          return { name: title, value: id };
        });

        //console.log(roleChoices);
        inquirer
          .prompt([
            {
              type: "list",
              name: "newEmployeeRole",
              message: "What is the new employee's role?",
              choices: roleChoices,
            },
          ])
          .then((employeeRole) => {
            //console.log(employeeRole.newEmployeeRole);

            const sqlManager = `SELECT id, first_name, last_name FROM employee`;
            db.query(sqlManager, (err, managerRows) => {
              if (err) {
                console.log(err);
                return;
              }
              //console.log(managerRows);
              //using map to add a name and vlaue to choices array for manager inquirer
              // the name will display but the value is what is returned in the answer of the prompt
              managerChoices = managerRows.map(
                ({ id, first_name, last_name }) => {
                  return { name: first_name + " " + last_name, value: id };
                }
              );

              //console.log(managerChoices);
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "newEmployeeManager",
                    message: "Who is the new employee's manager?",
                    choices: managerChoices,
                  },
                ])
                .then((employeeManager) => {
                  // first name last name role manager

                  // defining new array that holds all the info needed for the new employee
                  employeeInfoArr = [
                    employeeName.newFirstName,
                    employeeName.newLastName,
                    employeeRole.newEmployeeRole,
                    employeeManager.newEmployeeManager,
                  ];

                  //console.log(employeeInfoArr);
                  // declaring a variable for the sql insert query
                  const sqlEmployeeInfo = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                    VALUES (?, ?, ?, ?)`;

                  // applying query to add the employee info in to the employee table
                  db.query(sqlEmployeeInfo, employeeInfoArr, (err, result) => {
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
    });
};

module.exports = {
  addDepartment,
  addRole,
  addEmployee,
};
