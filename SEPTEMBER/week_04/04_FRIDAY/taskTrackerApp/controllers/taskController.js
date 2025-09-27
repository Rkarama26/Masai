const { readTasks, writeTasks } = require("../models/taskModel");


function getAllTasks(req, res) {
    const tasks = readTasks()
    res.json({ message: "Get all tasks", tasks });
}
// POST /tasks
function addTask(req, res) {
    const { title, description, tag, priority, status } = req.body;

    if (!title || !description || !tag || !priority || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const data = readTasks();
    const tasks = data.tasks;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        tag,
        priority,
        status,
    };

    data.tasks.push(newTask);
    writeTasks(data);
    res.status(201).json(newTask);
}
// GET /tasks/filter?tag=tagName
function filterTasksByTag(req, res) {
    const { tag } = req.query;
    const data = readTasks();

    if (!tag) {
        return res.status(400).json({ message: "Tag query is required" });
    }

    const filtered = data.tasks.filter((task) => task.tag === tag);
    res.json(filtered);
};

// PUT /tasks/:id
function updateTask(req, res) {
    const id = +(req.params.id);
    const { title, description, tag, priority, status } = req.body;

    const data = readTasks();
    const taskIndex = data.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    data.tasks[taskIndex] = {
        ...data.tasks[taskIndex],
        title: title ?? data.tasks[taskIndex].title,
        description: description ?? data.tasks[taskIndex].description,
        tag: tag ?? data.tasks[taskIndex].tag,
        priority: priority ?? data.tasks[taskIndex].priority,
        status: status ?? data.tasks[taskIndex].status,
    };

    writeTasks(data);
    res.json(data.tasks[taskIndex]);
};

// DELETE /tasks/:id
function deleteTask(req, res) {
    const id = +(req.params.id);

    const data = readTasks();
    const taskIndex = data.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = data.tasks.splice(taskIndex, 1);
    writeTasks(data);

    res.json({ message: "Task deleted", deletedTask });
};

module.exports = {
    getAllTasks,
    filterTasksByTag,
    addTask,
    updateTask,
    deleteTask,
};