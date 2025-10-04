

const express = require('express');
const TaskModel = require('../module/taskModule');
const mongoose = require('mongoose');
const TaskRouter = express.Router();

const taskController = require("../controllers/taskController");
const validateTask = require('../middleware/validateTask');

TaskRouter.get("/get", taskController.getTasks);
TaskRouter.post("/add", validateTask, taskController.addTask);
TaskRouter.delete("/:id", taskController.deleteTask);
TaskRouter.patch("/:id", taskController.updateTask);

module.exports = TaskRouter
  

