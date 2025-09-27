const fs = require("fs");
const path = require("path");

const tasksFile = path.join(process.cwd(), "tasks.json");

// Read tasks
function readTasks() {
  if (!fs.existsSync(tasksFile)) return [];
  const data = fs.readFileSync(tasksFile, "utf-8");
  return data ? JSON.parse(data) : [];
}

// Write tasks
function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2), "utf-8");
}

module.exports = { readTasks, writeTasks };
