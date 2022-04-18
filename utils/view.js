// packages needed for app
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const startPrompt = require("../index");

const db = require("../db/connection");

const viewDepartment = () => {
  //console.log(startPrompt);
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    //displays the table in the console
    console.table(rows);
     // starts the initial prompt
    startPrompt.startfunc();
  });
};

const viewRoles = () => {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role 
                      LEFT JOIN department ON department_id = department.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    //displays the table in the console
    console.table(rows);
    // starts the initial prompt
    startPrompt.startfunc();
  });
};

const viewEmployees = () => {
  const sql = `SELECT employee.id, 
                        employee.first_name, 
                        employee.last_name, 
                        role.title, 
                        department.name AS department, 
                        role.salary, 
                        employee.manager_id, 
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
                  LEFT JOIN role ON role_id = role.id
                  LEFT JOIN department ON department_id = department.id
                  LEFT JOIN employee manager on manager.id = employee.manager_id;`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    //displays the table in the console
    console.table(rows);
    
    // starts the initial prompt
    startPrompt.startfunc();
  });
};

module.exports = {
  viewDepartment,
  viewRoles,
  viewEmployees,
};
