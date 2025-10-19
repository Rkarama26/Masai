const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middlware");
const todoRouter = express.Router();

// Create todo
todoRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const todo = await TodoModel.create({ ...req.body, userId: req.user });
        res.status(201).json({ message: "Todo added", todo });
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo" });
    }
});

// Get all
todoRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const todos = await TodoModel.find({ userId: req.user });
        res.status(200).json({ message: "Todo list", todos });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Update todo by id
todoRouter.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await TodoModel.findById(id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        if (todo.userId.toString() !== req.user) {
            return res.status(403).json({ error: "Forbidden: You can't update this todo" });
        }

        Object.assign(todo, req.body);
        await todo.save();

        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
});

// Delete todo by id
todoRouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await TodoModel.findById(id);
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        if (todo.userId.toString() !== req.user) {
            return res.status(403).json({ error: "Forbidden: You can't delete this todo" });
        }

        await TodoModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

module.exports = todoRouter;
