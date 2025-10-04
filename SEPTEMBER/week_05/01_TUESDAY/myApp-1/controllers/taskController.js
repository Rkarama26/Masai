const TaskModel = require("../module/taskModule");

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST create task
const addTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH update task
const updateTask = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Only allow specific fields
    const allowedFields = ["title", "description", "priority", "isCompleted"];
    Object.keys(updates).forEach((key) => {
      if (!allowedFields.includes(key)) delete updates[key];
    });

    // Auto-set completionDate if isCompleted is true
    if (updates.isCompleted === true) {
      updates.completionDate = new Date();
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask
};
