const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middlware");
const todoRouter = express.Router();

// all routes of todo protected 
// can not access without login
todoRouter.post("/add-todo", authMiddleware, async (req, res) => {
    console.log(req.user) // atched user to body in auth middleware
    try {
        let todo = await TodoModel.create({ ...req.body, userId: req.user })
        res.status(200).json({ message: "todo added", todo })
    } catch (error) {
        res.status(500).json({ error: "failed to add todo" })
    }
})

todoRouter.get("/", authMiddleware, async (req, res) => {
    try {
        let todos = await TodoModel.find({ userId: req.user })
        res.status(200).json({ message: "Todo List ", todos })
    } catch (error) {
        res.status(500).json({ error: "failed to add todo" })

    }
})
module.exports = todoRouter;