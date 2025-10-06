const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

//  (avoid duplicates)
enrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const EnrollModel = new mongoose.model("Enrollment", enrollmentSchema);

module.exports = EnrollModel;