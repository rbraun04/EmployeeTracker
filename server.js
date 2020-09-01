const inquirer = require("inquirer");
const mysql = require("mysql");



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

    
