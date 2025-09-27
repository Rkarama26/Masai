

const { readDB, writeDB } = require("../models/ticketModel");

//get all 
function getAllTickets(req, res) {
    const db = readDB();
    res.json(db.tickets);
};

// create new ticket
function createTicket(req, res) {
    const db = readDB();
    const { title, description, priority, user } = req.body;

    const newTicket = {
        id: db.tickets.length ? db.tickets[db.tickets.length - 1].id + 1 : 1,
        title,
        description,
        priority,
        user,
        status: "pending"
    };

    db.tickets.push(newTicket);
    writeDB(db);

    res.status(201).json(newTicket);
};
//get by id 
function getTicketById(req, res) {
    const { id } = req.params;
    const db = readDB();
    const ticket = db.tickets.find(t => t.id === parseInt(id));

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    res.json(ticket);
};

//update by id 
function updateTicket(req, res) {
    const { id } = req.params;
    const { title, description, priority } = req.body;

    const db = readDB();
    const ticket = db.tickets.find(t => t.id === parseInt(id));

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (priority !== undefined) ticket.priority = priority;

    writeDB(db);
    res.json(ticket);
};

// delete by id 
function deleteTicket(req, res) {
    const { id } = req.params;
    const db = readDB();

    const index = db.tickets.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Ticket not found" });

    const deleted = db.tickets.splice(index, 1);
    writeDB(db);

    res.json({ message: "Ticket deleted", deleted });
};

// Resolve ticket
function resolveTicket(req, res) {
    const { id } = req.params;
    const db = readDB();

    const ticket = db.tickets.find(t => t.id === parseInt(id));
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.status = "resolved";
    writeDB(db);

    res.json({ message: "Ticket resolved", ticket });
};



module.exports = { deleteTicket, resolveTicket, updateTicket, getAllTickets, createTicket, getTicketById };
