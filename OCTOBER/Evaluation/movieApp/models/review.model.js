
const mongoose = require('mongoose');
const MovieModel = require('./movie.model');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
    },
    comment: {
        type: String,
        trim: true,
    },
},
    { timestamps: true }
);


async function updateMovieAverage(movieId) {
    const result = await mongoose.model("Review").aggregate([
        { $match: { movie: movieId } },
        { $group: { _id: "$movie", avgRating: { $avg: "$rating" } } },
    ]);

    const average = result.length > 0 ? result[0].avgRating : 0;
    await MovieModel.findByIdAndUpdate(movieId, { averageRating: average });
}

// hooks after creating , updating, deleting
reviewSchema.post("save", async function () {
    await updateMovieAverage(this.movie);
});

reviewSchema.post("findOneAndDelete", async function (doc) {
    if (doc) await updateMovieAverage(doc.movie);
});

reviewSchema.post("findOneAndUpdate", async function (doc) {
    if (doc) await updateMovieAverage(doc.movie);
});



const ReviewModel = new mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;