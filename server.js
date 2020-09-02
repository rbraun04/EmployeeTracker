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
            console.log("Added to Employees!");
        }
        );
        firstQuestions();
    });
}

// function to add roles

function addRole() {
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Please enter a role",
            name: "roletitle"
        },
        {
            type: "input",
            message: "Pleaes enter that roles salary",
            name: "rolesalary"
        },
        {
            type: "input",
            message: "Please enter this roles department id",
            name: "roleDepId"

        }
    ]).then(function(response) {
        connection.query("INSERT INTO roles SET ?",
        {
            title: response.roletitle,
            salary: response.rolesalary,
            department_id: response.roleDepId,
        },
        function(err, response){
            if(err) {
                throw err;
            }
            console.log("Role added!");
        }
        );
        firstQuestions();
    })
}

// function to add departments 

function addDepartment () {
    inquirer
    .prompt ([
        {
            type: "input",
            message: "Please enter a department name",
            name: "department",
        },
        
    ]).then(function(response) {
        connection.query("INSERT INTO department SET ?",
        {
            name: response.department,
        },
        function (err, response){
            if (err) {
                throw err;
            }
            console.log("Department added!")
        });
        firstQuestions();
    })
}

// function to update employee

function updatedEmployeeRole() {
    let employeesarray = [];
    connection.query("SELECT * FROM employee", function(err, response){
        for (let i=0; i < response.length; i++) {
            let employeesstring = response[i].id + " " + response[i].first_name + " " + response[i].last_name;
            employeesarray.push(employeesstring);
        }
    inquirer
    .prompt ([
        {
            type: "list",
            name: "updateEmployeeRole",
            message: "Please select an employee to update their role",
            choices: employeesarray
        },
        {
            type: "input",
            name: "newrole",
            message: "What is the new role for this employee?",
        }
    ]).then(function(response){
        console.log("about to update", response);
        const idUpdate = {};
        idUpdate.employeeId = parseInt(response.updateEmployeeRole.split(" ")[0]);
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?"[idUpdate.role_id, idUpdate.employeeId],
        function (err, data) {
            firstQuestions();
        }
        );
    })
    })

}
// function to view all employees

function viewAllEmployees() {
    var allEmployees = "SELECT * FROM employee";
    connection.query(allEmployees, function(err, response){
        console.log("\n Employees \n");
        console.table(response);
    });
    firstQuestions();

}

// function to view all departments

function viewAllDepartments() {
    var allDepartments = "SELECT * FROM department";
    connection.query(allDepartments, function(err, response){
        console.log("\n Departments \n");
        console.table(response)
    });
    firstQuestions();
}

// function to view all roles

function viewAllRoles() {
    var allRoles = "SELECT * FROM roles";
    connection.query(allRoles, function(err, response){
        console.log("\n Roles \n");
        console.table(response)
    });
    firstQuestions();
}