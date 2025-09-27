const fs = require("fs");
const path = require("path");

const employeesFile = path.join(process.cwd(), "employees.json");

// Read employees
function readEmployees() {
  if (!fs.existsSync(employeesFile)) return [];
  const data = fs.readFileSync(employeesFile, "utf-8");
  return data ? JSON.parse(data) : [];
}

// Write employees
function writeEmployees(employees) {
  fs.writeFileSync(employeesFile, JSON.stringify(employees, null, 2), "utf-8");
}

module.exports = { readEmployees, writeEmployees };
