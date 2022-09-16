-- Seed Departments
INSERT INTO department (department_name)
VALUES ('Executive');
INSERT INTO department (department_name)
VALUES ('Sales');
INSERT INTO department (department_name)
VALUES ('Marketing');
INSERT INTO department (department_name)
VALUES ('Engineering');
INSERT INTO department (department_name)
VALUES ('Finance');
INSERT INTO department (department_name)
VALUES ('Human Resources');

-- Seed Roles
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Recruiter', 70000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 70000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Marketer', 85000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Full Stack Engineer', 130000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 150000, 5);

-- Seed Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jonathan', 'Toews', 1, Null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Patrick', 'Kane', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Duncan', 'Keith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Patrick', 'Sharp', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Marian', 'Hossa', 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brent', 'Seabrook', 5, 1);