// packages needed for app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();

const db = require("./db/connection");

const {viewDepartment, viewRoles, viewEmployees} = require("./utils/view");

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
      }
    })
};

// connects to mysql database
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
  //viewDepartment();
  //viewRoles();
  //viewEmployees();
  startPrompt();
});


exports.startfunc = startPrompt;