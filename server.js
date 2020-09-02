const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./database.js");



// begin prompts

const firstQuestions = function() {
    inquirer
    .prompt ({
        type: "list",
        name: "firstQuestions",
        message:  "What would you like to do first?",
        choices: [
            "view all employees",
            "view all roles",
            "view all departments",
            "add employee",
            "add department",
            "add role",
            "update employee role",
            "remove employee"            
        ]
    }).then(function(answer) {
        console.log(answer);
        switch (answer.firstQuestions) {
            case "view all employees":
                viewAllEmployees();
                    break;
            case "view all roles":
                viewAllRoles();
                    break;
            case "view all departments":
                viewAllDepartments();
                    break;
            case "add employee":
                addEmployee();
                    break; 
            case "update employee role":
                updatedEmployeeRole();
                    break;
            case "add department":
                addDepartment();
                break;
            case "add role":
                addRole();
                break;
  
                }
    });
    };
    firstQuestions();

    // build functions to add an employee, add a new role/title, update role, add new department, view all departments, view all roles, view all employees. 


// function to add employee

function addEmployee () {
    inquirer
    .prompt ([
        { 
            type: "input",
            message: "Please enter your employees first name",
            name: "firstname",
        },
        {
            type: "input",
            message: "Please enter your employees last name",
            name: "lastname",

        }
    ]).then(function(response) {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: response.firstname,
            last_name: response.lastname,
            role_id: null,
            manager_id: null,
        },
        function (err, response) {
            if (err) {
                throw err;
            }
            console.log();
        }
        );
        firstQuestions();
    });
}

// function to view all employees

function viewAllEmployees() {
    var allEmployees = "SELECT * FROM employee";
    connection.query(allEmployees, function(err, response){
        console.log("\n Employees \n");
        console.table(response);
    })

}

// function to view all departments

function viewAllDepartments() {
    var allDepartments = "SELECT * FROM department";
    connection.query(allDepartments, function(err, response){
        console.log("\n Departments \n");
        console.table(response)
    })
}

// function to view all roles

function viewAllRoles() {
    var allRoles = "SELECT * FROM role";
    connection.query(allRoles, function(err, response){
        console.log("\n Roles \n");
        console.table(response)
    })
}