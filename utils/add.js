//add a department, add a role, add an employee,

const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const startPrompt = require("../index");
const { viewDepartment, viewRoles, viewEmployees } = require("./view");

const db = require("../db/connection");

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
      console.log(answers);
      const sql = `INSERT INTO department (name)
                    VALUES(?)`;
      db.query(sql, answers.newDepartment, (err, rows) => {
          if(err) {
              console.log(err);
              return;
          }
          viewDepartment();
        
      })
    });

  /*  const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
      //console.log(startPrompt.startPrompt)
      startPrompt.startfunc();
    }); */
};

module.exports = addDepartment;
