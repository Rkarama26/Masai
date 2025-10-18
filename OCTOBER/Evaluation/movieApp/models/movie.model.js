
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
    },
    genre: {
        type: String,
        trim: true,
    },
    releaseYear: {
        type: Number,
        min: 1800,
    },
    director: {
        type: String,
        trim: true,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
);

const MovieModel = new mongoose.model("Movie", movieSchema);
module.exports = MovieModel;