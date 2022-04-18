# Employee-Tracker-Weekly-Challenge12

  ![badge](https://img.shields.io/badge/license-MIT%20License-blue)

 ## Table of Contents 
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Credits](#credits)
  - [License](#license)
  


## Description 

The purpose of this week's challenge was to create a command-line application that manages an employee databse using Node.js, Inquirer, and MySQL while demonstrating CRUD (Create, Read, Update, Delete) operations.



Below are the challenge requirements:

GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

<br>

A video of the application in use: 

[Demonstration Video](https://drive.google.com/file/d/158KPoB15UtFb96yTv01IVNqhnPJYdBhY/view?usp=sharing)

<br>

## Installation

The user must install Node.js, inquirer, mysql2, and console.table packages before use.


## Usage 

This application can be used to manage an employee database. To start the application, type "node index.js" into the command line terminal.

## Tests

No tests conducted for this application.

## Credits

- AskBCS
- Various Classmates
- TA's
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Inquirer Documentation](https://www.npmjs.com/package/inquirer)
- [MySQL2 Documentation](https://www.npmjs.com/package/mysql2#documentation)
- [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [console.table Documention](https://www.npmjs.com/package/console.table)
- [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- [Information used to help with exports and require](https://www.sitepoint.com/understanding-module-exports-exports-node-js/)
- [Array map method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)


## License

MIT License

Copyright (c) [2022] [Christopher Sarmiento-Salas]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.