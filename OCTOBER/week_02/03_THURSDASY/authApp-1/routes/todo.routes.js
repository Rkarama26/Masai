const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middlware");
const todoRouter = express.Router();

// all routes of todo protected 
// can not access without login
todoRouter.post("/add-todo", authMiddleware(["user", "admin"]), async (req, res) => {
    console.log(req.user) // atched user to body in auth middleware
    try {
        let todo = await TodoModel.create({ ...req.body, userId: req.user })
        res.status(200).json({ message: "todo added", todo })
    } catch (error) {
        res.status(500).json({ error: "failed to add todo" , error})
    }
})

todoRouter.get("/", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        let todos = await TodoModel.find({ userId: req.user.id })
        res.status(200).json({ message: "Todo List ", todos })
    } catch (error) {
        res.status(500).json({ error: "failed to get todo", error })

    }
})
module.exports = todoRouter;