const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB: tasks'))
    .catch((err) => console.error(' MongoDB connection error:', err));

// Task Schema & Model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'pending' },
    dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Create Task
app.post('/tasks', async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const newTask = new Task({ title, description, status, dueDate });
        const savedTask = await newTask.save();
        res.status(201).json({ message: 'Task created successfully', data: savedTask });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
});

//  Read All or Filtered Tasks
app.get('/tasks', async (req, res) => {
    try {
        const { status, dueDate } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (dueDate) filter.dueDate = new Date(dueDate);

        const tasks = await Task.find(filter);
        res.status(200).json({ message: 'Tasks retrieved', data: tasks });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
});

//  Update Task by ID
app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', data: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
});

//  Delete Task by ID
app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
