// routes/ticket.routes.js
const express = require("express");
const authMiddleware = require("../middlewares/authMiddeware");
const { bookTicket, cancelTicket } = require("../controllers/ticket.controller");


const ticketRouter = express.Router();

// POST /api/tickets/book — Authenticated users only
ticketRouter.post("/book", authMiddleware(["user", "admin"]), bookTicket);
ticketRouter.patch("/cancel/:id", authMiddleware(["user", "admin"]), cancelTicket);


module.exports = ticketRouter;
