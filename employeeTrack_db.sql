DROP DATABASE IF EXISTS employeeTrack_db;
CREATE database employeeTrack_db;

USE employeeTrack_db;

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT(10)
);

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    department_id INT(10)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10),
    manager_id INT(10) NULL
);