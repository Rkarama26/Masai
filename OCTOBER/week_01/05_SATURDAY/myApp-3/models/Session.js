const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    learners: [
        {
            learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' },
            attendance: { type: String, enum: ['present', 'absent', 'cancelled'], default: 'present' },
            feedback: { type: String },
        },
    ],
    topic: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    notes: { type: String },
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
});

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports = SessionModel

