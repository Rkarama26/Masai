const e = require("express");
const { readEmployees, writeEmployees } = require("../models/employeeModel");


//both
const getAllEmployees = (req, res) => {
    const employees = readEmployees();
    res.json(employees);
};

// POST /employees (Admin only)
const addEmployee = (req, res) => {
    const { name, position, department, salary, status } = req.body;

    if (!name || !position || !department || !salary || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const data = readEmployees();
    const employee = data.employees;
    const newEmployee = {
        id: employee.length ? employee[employee.length - 1].id + 1 : 1,
        name,
        position,
        department,
        salary,
        status,
    };
    data.employees.push(newEmployee);
    writeEmployees(data);

    res.status(201).json(newEmployee);
};

// PUT /employees/:id (Admin/HR)
const updateEmployee = (req, res) => {
    const id = +(req.params.id);
    const { name, position, department, salary, status } = req.body;

    const data = readEmployees();
    const employeeIndex = data.employees.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    data.employees[employeeIndex] = {
        ...employees[employeeIndex],
        name: name ?? employees[employeeIndex].name,
        position: position ?? employees[employeeIndex].position,
        department: department ?? data.employees[employeeIndex].department,
        salary: salary ?? data.employees[employeeIndex].salary,
        status: status ?? data.employees[employeeIndex].status,
    };

    writeEmployees(data);
    res.json(data.employees[employeeIndex]);
};

// DELETE /employees/:id (Admin only)
const deleteEmployee = (req, res) => {
    const id = +(req.params.id);

    let data = readEmployees();
    const employeeIndex = data.employees.findIndex((e) => e.id === id);

    if (employeeIndex === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    const deletedEmployee = data.employees.splice(employeeIndex, 1);
    writeEmployees(data);

    res.json({ message: "Employee deleted", deletedEmployee });
};

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
};