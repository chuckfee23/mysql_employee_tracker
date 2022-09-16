const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const util = require("util");

const PORT = process.env.PORT || 3001;
// declare database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    // MySQL password
    password: "",
    database: "employees",
  },
  console.log(`Connected to the courses_db database.`)
);

db.query = util.promisify(db.query);
//connect to the database and start the application
db.connect(function (err) {
  //display error if there is one
  if (err) throw err;
  //otherwise, call the function appHome (home menu of application)
  appHome();
});

const appHome = async () => {
  try {
    let selection = await inquirer.prompt({
      name: "userOptions",
      type: "list",
      message: "Which of the available actions would you like to take?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Exit",
      ],
    });
    switch (selection.userOptions) {
      // If user selects to View All Departments, execute function to view departments
      case "View All Departments":
        viewDepartments();
        break;
      // If user selects to View All Roles, execute function to view roles
      case "View All Roles":
        viewRoles();
        break;
      // If user selects to View All Employees, execute function to view employees
      case "View All Employees":
        viewEmployees();
        break;
      // If user selects to Add A Department, execute function to add departments
      case "Add A Department":
        addDepartment();
        break;
      // If user selects to Add A Role, execute function to add roles
      case "Add A Role":
        addRole();
        break;
      // If user selects to Add An Employee, execute function to add employees
      case "Add An Employee":
        addEmployee();
        break;
      // If user selects to Update An Employee Role, execute that function
      case "Update An Employee Role":
        updateEmployee();
        break;
      //If user selects exit, end the connection
      case "Exit":
        db.end();
        break;
    }
  } catch (err) {
    console.log(err);
    appHome();
  }
};

const viewDepartments = async () => {
  console.log("Viewing All Departments");
  try {
    let query = `SELECT department.id AS ID, department.department_name AS DEPARTMENT FROM department;`;
    db.query(query, function (err, result) {
      if (err) throw err;
      let departmentArray = [];
      result.forEach((department) => departmentArray.push(department));
      console.table(departmentArray);
      appHome();
    });
  } catch (err) {
    console.log(err);
    appHome();
  }
};

const viewRoles = async () => {
  console.log("Viewing All Roles");
  try {
    let query = `SELECT role.id AS ID, role.title AS TITLE, department.department_name AS DEPARTMENT FROM role INNER JOIN department ON role.department_id = department.id`;
    db.query(query, function (err, result) {
      if (err) throw err;
      let roleArray = [];
      result.forEach((role) => roleArray.push(role));

      console.table(roleArray);
      appHome();
    });
  } catch (err) {
    console.log(err);
    appHome();
  }
};

const viewEmployees = async () => {
  console.log("Viewing All Employees");
  try {
    let query = `SELECT employee.id AS ID, 
                employee.first_name AS FIRST, 
                employee.last_name AS LAST, 
                role.title AS TITLE, 
                department.department_name AS DEPARTMENT, 
                role.salary AS SALARY, CONCAT (manager.first_name, " ", manager.last_name) AS MANAGER
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.idnode `;
    db.query(query, function (err, result) {
      if (err) throw err;
      let employeeArray = [];
      result.forEach((employee) => employeeArray.push(employee));
      console.table(employeeArray);
      appHome();
    });
  } catch (err) {
    console.log(err);
    appHome();
  }
};

const addDepartment = async () => {
  console.log("Add A Department");
  try {
    let newDepartment = await inquirer.prompt({
      name: "inputDepartment",
      type: "input",
      message:
        "Please name the department which you are adding to the database.",
    });

    let query = "INSERT INTO department SET ?";
    await db.query(query, {
      department_name: newDepartment.inputDepartment,
    });
    console.log(
      `${newDepartment.inputDepartment} added to department table.\n`
    );
    appHome();
  } catch (err) {
    console.log(err);
    appHome();
  }
};

const addRole = async () => {
  console.log("Add A Role");
  try {
    let query = "SELECT * FROM department";
    let departments = await db.query(query);

    let selection = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Please list the title of the new role.",
      },
      {
        name: "salary",
        type: "input",
        message: "Please list the salary of the new role.",
      },
      {
        name: "departmentId",
        type: "list",
        message: "Please choose the department for this role.",
        choices: departments.map((departmentId) => {
          return {
            name: departmentId.department_name,
            value: departmentId.id,
          };
        }),
      },
    ]);

    let query2 = "INSERT INTO role SET ?";
    db.query(query2, {
      title: selection.title,
      salary: selection.salary,
      department_id: selection.departmentId,
    });

    console.log(`${selection.title} role has been added to the database.`);
    appHome();
  } catch (err) {
    console.log(err);
    appHome();
  }
};
