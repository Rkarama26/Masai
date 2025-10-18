const express = require("express");
const MovieModel = require("../models/movie.model");
const ReviewModel = require("../models/review.model");
const authMiddleware = require("../middleware/auth.middlware");
const reviewRouter = express.Router();

// create
reviewRouter.post("/", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const { movie, rating, comment } = req.body;
        const userId = req.user.id;

        const movieExists = await MovieModel.findById(movie);
        if (!movieExists) return res.status(404).json({ error: "Movie not found" });

        // only one review per user per movie
        const existingReview = await ReviewModel.findOne({ user: userId, movie });
        if (existingReview)
            return res.status(400).json({ error: "You already reviewed this movie" });

        // Validate 
        if (!rating || rating < 1 || rating > 5)
            return res.status(400).json({ error: "Rating must be between 1 and 5" });

        //save 
        const review = await ReviewModel.create({
            user: userId,
            movie,
            rating,
            comment,
        });

        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});
// get by id
reviewRouter.get("/movie/:movieId", authMiddleware(), async (req, res) => {
    try {
        const { movieId } = req.params;

        const reviews = await ReviewModel.find({ movie: movieId })
            .populate("user", "username email -_id")
            .sort({ createdAt: -1 });

        if (!reviews.length)
            return res.status(404).json({ message: "No reviews found for this movie" });

        res.status(200).json({ count: reviews.length, reviews });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});
// update 
reviewRouter.put("/:id", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { rating, comment } = req.body;

        const review = await ReviewModel.findById(id);
        if (!review) return res.status(404).json({ error: "Review not found" });

        // Only who owns this can update
        if (review.user.toString() !== userId)
            return res.status(403).json({ error: "You can only edit your own review" });

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;
        await review.save();

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});
//  delete by id
reviewRouter.delete("/:id", authMiddleware(["user", "admin"]), async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const review = await ReviewModel.findById(id);
        if (!review) return res.status(404).json({ error: "Review not found" });

        // Only owner can 
        if (review.user.toString() !== userId)
            return res.status(403).json({ error: "You can only delete your own review" });

        await ReviewModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});


module.exports = reviewRouter;