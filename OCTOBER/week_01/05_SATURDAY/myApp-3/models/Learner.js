const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    email: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
});

const LearnerModel = mongoose.model('Learner', learnerSchema);

module.exports = LearnerModel

