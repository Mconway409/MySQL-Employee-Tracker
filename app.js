const mysql = require("mysql");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3306;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Bruins4991!@#",
  database: "employeeTrack_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  askQuestions();
});

function askQuestions() {
  inquirer
    .prompt({
      message: "what would you like to do?",
      type: "list",
      choices: [
        "view all employees",
        "view all departments",
        "view all roles",
        "add employee",
        "add department",
        "add role",
        "update employee role",
        "QUIT",
      ],
      name: "choice",
    })
    .then((answers) => {
      console.log(answers.choice);
      switch (answers.choice) {
        case "view all employees":
          viewEmployees();
          break;

        case "view all departments":
          viewDepartments();
          break;

        case "view all roles":
          viewRoles();
          break;

        case "add employee":
          addEmployee();
          break;

        case "add department":
          addDepartment();
          break;

        case "add role":
          addRole();
          break;

        case "update employee role":
          updateEmployeeRole();
          break;

        default:
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, data) {
    console.table(data);
    askQuestions();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, data) {
    console.table(data);
    askQuestions();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, data) {
    console.table(data);
    askQuestions();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the employees ID?",
      },
      {
        type: "input",
        name: "firstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?",
      },
      {
        type: "number",
        name: "roleId",
        message: "What is the employees role ID",
      },
      {
        type: "number",
        name: "managerId",
        message: "What is the employees manager's ID?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)",
        [res.id, res.firstName, res.lastName, res.roleId, res.managerId],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully Inserted");
          askQuestions();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the department to be added?",
      },
      {
        type: "input",
        name: "department",
        message: "What is the department that you want to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        "INSERT INTO department (id, name) VALUES (?, ?)",
        [res.id, res.department],
        function (err, data) {
          if (err) throw err;
          console.table("Successfully Inserted");
          askQuestions();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "enter ID:",
      },
      {
        type: "input",
        name: "title",
        message: "enter title:",
      },
      {
        type: "number",
        name: "salary",
        message: "enter salary:",
      },
      {
        type: "number",
        name: "department_id",
        message: "enter department ID:",
      },
    ])
    .then(function (response) {
      connection.query(
        "INSERT INTO roles (id, title, salary, department_id) values (?, ?, ?, ?)",
        [res.id, res.title, res.salary, res.department_id],
        function (err, data) {
          console.table(data);
        }
      );
      askQuestions();
    });
}
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "which employee would you like to update?",
      },
      {
        type: "number",
        name: "role_id",
        message: "enter the new role ID:",
      },
    ])
    .then(function (response) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [res.role_id, res.name],
        function (err, data) {
          console.table(data);
        }
      );
      askQuestions();
    });
}
