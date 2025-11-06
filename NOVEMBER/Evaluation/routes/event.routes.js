// routes/event.routes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddeware");
const { createEvent, getAllEvents } = require("../controllers/event.controller");


const eventRouter = express.Router();

// Admin-only 
eventRouter.post("/create", authMiddleware(["admin"]), createEvent);

eventRouter.get("/", getAllEvents);

module.exports = eventRouter;
