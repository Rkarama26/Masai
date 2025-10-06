
const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const StudentModel = new mongoose.model("Student", studentSchema);

module.exports = StudentModel 
