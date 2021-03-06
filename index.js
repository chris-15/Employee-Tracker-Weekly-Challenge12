// packages needed for app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = require("./db/connection");

const { viewDepartment, viewRoles, viewEmployees } = require("./utils/view");

const { addDepartment, addRole, addEmployee } = require('./utils/add');
const updateEmployee = require('./utils/update');

const startPrompt = () => {
  console.log(`
    =================
    Employee Tracker
    =================
    `);

  inquirer
    .prompt([
      {
        type: "list",
        name: "trackerStart",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      //console.log(answers)

      switch (answers.trackerStart) {
        case "View all departments":
          viewDepartment();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Exit":
          // .end() ends the database connection and terminates the application
          db.end()
          break;
      }
    });
};

// connects to mysql database
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  startPrompt();
});

// exporting startprompt function inorder to call it back in the view functions in view.js
exports.startfunc = startPrompt;
