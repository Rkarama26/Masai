const express = require('express');
const MovieModel = require('../models/movie.model');
const authMiddleware = require('../middleware/auth.middlware');
const ReviewModel = require('../models/review.model');
const loggerMiddleware = require('../middleware/loggerMiddleware');

const movieRouter = express.Router();

movieRouter.post("/",  authMiddleware(["admin"]), async (req, res) => {
    try {
        const { title, genre, releaseYear, director } = req.body;

        if (!title || !genre || !releaseYear || !director) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const movieExists = await MovieModel.findOne({ title });
        if (movieExists) {
            return res.status(400).json({ error: "Movie with this title already exists" });
        }

        const movie = await MovieModel.create({ title, genre, releaseYear, director });
        res.status(201).json({ message: "Movie added successfully", movie });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});

movieRouter.get("/", authMiddleware(), async (req, res) => {
    try {
        const { genre } = req.query;
        const filter = genre ? { genre } : {};

        const movies = await MovieModel.find(filter);
        res.status(200).json({ count: movies.length, movies });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});

movieRouter.get("/:id", authMiddleware(), async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieModel.findById(id);

        if (!movie) return res.status(404).json({ error: "Movie not found" });

        const reviews = await ReviewModel.find({ movie: id })
            .populate("user", "username email -_id")
            .select("rating comment createdAt");

        res.status(200).json({ movie, reviews });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});



module.exports = movieRouter;