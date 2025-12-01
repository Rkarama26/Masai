const express = require("express");
const TodoModel = require("../models/todo.model");
const authMiddleware = require("../middleware/auth.middlware");
const redis = require("../configs/redis.config");
const todoRouter = express.Router();
const cron = require('node-cron');
const PDFDocument = require('pdfkit');
const fs = require('fs')



// when new todo added to db, delete data from redis
todoRouter.post("/add-todo", authMiddleware(["user", "admin"]), async (req, res) => {
    console.log(req.user) // atched user to body in auth middleware
    try {
        let todo = await TodoModel.create({ ...req.body, userId: req.user.id })
        redis.del(req.user.id)
        res.status(200).json({ message: "todo added", todo })
    } catch (error) {
        res.status(500).json({ error: "failed to add todo", error })
    }
})

// caching is applied to this route
todoRouter.get("/all", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        // check data is present in redis first ,
        // if present, send respone from redis 
        // if not, send response from DB
        let userId = req.user.id;
        let cachedData = await redis.get(userId)
        console.log("cachedData: ", cachedData)
        if (!cachedData) {
            // if data is not stored in cache memory
            let todos = await TodoModel.find({ userId: req.user.id })

            //storing in redis 
            redis.set(userId, JSON.stringify(todos), "EX", 60)
            res.status(200).json({ message: "Todo List from db ", todos })
        } else {
            // if data present in redis, send response
            let todos = JSON.parse(cachedData);
            res.status(200).json({ message: "Todos list form redis", todos })
        }


    } catch (error) {
        res.status(500).json({ error: "failed to get todo", error })

    }
})

// Implementation/Integration of utility Modules
// which provides a service of bulk adding the todos then after sending the report to user's email
// 

todoRouter.post("/bulk-add-todos", authMiddleware(["user", "admin"]), async (req, res) => {

    // User will give array of todos 
    // store in redis and provide the response 
    // let cron runs at every 10 mins, which uploads Todos in db and finally sends the email

    let userId = req.user.id;
    let todos = req.body;

    todos.push(userId)

    redis.set("BulkTodoUpdate", JSON.stringify(todos));
    res.status(200).json({ message: "Task is scheduled, will Receive report in email, once it is updated" })

}) 

// run a cron which pushes todos into db and sends MAIL 
cron.schedule('*/10 * * * * *', async () => {
    let todos = await redis.get("BulkTodoUpdate");
    if (todos) {
        todos = JSON.parse(todos);
        let userId = todos[todos.length - 1];
        todos.pop() // poping userID
        // console.log('userId from cron', userId, todos);
        let passedTodo = 0;
        let failedTodo = 0;
        for (let todo of todos) {
            try {
                await TodoModel.create({ ...todo, userId })
                passedTodo++;
            } catch (error) {
                failedTodo++
            }
        }
        let report = `bulk todo update report:
    Task initiated by: ${userId}
    Passed Todos are: ${passedTodo}
    Failed Todos are: ${failedTodo}`;

        console.log(report)
        // generating report 
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`report/${userId}.pdf`));

        doc.fontSize(25).text(report, 100, 100);
        doc.end();

        redis.del("BulkTodoUpdate");
        console.log("cron finished")
    }
    else {
        console.log("No todos found")
    }

});





module.exports = todoRouter;