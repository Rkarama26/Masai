const express = require("express");
const NotesModel = require("../models/notes.model");
const authMiddleware = require("../middleware/authMiddleware");
const notesRouter = express.Router();

notesRouter.use(authMiddleware)

notesRouter.post("/create", async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new NotesModel({
            title,
            content,
            userId: req.user, // comes from decoded token
        });
        await note.save();
        res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


notesRouter.get("/", async (req, res) => {
    try {
        const notes = await NotesModel.find({ userId: req.user });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//  PUT /notes/:id → Update

notesRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NotesModel.findOne({ _id: id, userId: req.user });

        if (!note) {
            return res.status(404).json({ error: "Note not found or unauthorized" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;
        await note.save();

        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//   DELETE /notes/:id → Delete 
notesRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NotesModel.findOneAndDelete({ _id: id, userId: req.user });

        if (!note) {
            return res.status(404).json({ error: "Note not found or unauthorized" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = notesRouter;