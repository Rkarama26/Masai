
const express = require("express");
const { getAllTasks, addTask, filterTasksByTag, updateTask, deleteTask } = require("../controllers/taskController");

const router = express.Router();


router.get("/", getAllTasks);
router.post("/", addTask);
router.get("/filter", filterTasksByTag);
router.put("/:id", updateTask);        
router.delete("/:id", deleteTask);

module.exports = router;