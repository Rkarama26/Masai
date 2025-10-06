const MentorModel = require("../models/Mentor");
const SessionModel = require("../models/Session");

const createMentor = async (req, res) => {
    try {
        const mentor = new MentorModel(req.body);
        await mentor.save();
        res.status(201).json({ mentor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMentorSessions = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ mentorId: req.params.id, isActive: true, isArchived: false })
            .populate('learners.learnerId', 'name email')
            .sort({ scheduledAt: -1 });
        res.json(sessions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const countMentorLearners = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ mentorId: req.params.id, isActive: true, isArchived: false });
        let learnersSet = new Set();
        sessions.forEach(s => {
            s.learners.forEach(l => learnersSet.add(l.learnerId.toString()));
        });
        res.json({ totalLearners: learnersSet.size });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const softDeleteMentor = async (req, res) => {
    try {
        await Mentor.findByIdAndUpdate(req.params.id, { isActive: false });
        // Disable all upcoming sessions
        await SessionModel.updateMany(
            { mentorId: req.params.id, scheduledAt: { $gte: new Date() } },
            { isActive: false }
        );
        res.json({ message: 'Mentor soft-deleted and upcoming sessions disabled' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMentorsWithNoActiveSessions = async (req, res) => {
    try {
        const mentors = await Mentor.find({ isActive: true });
        const mentorsWithSessions = await SessionModel.find({ isActive: true, isArchived: false }).distinct('mentorId');
        const freeMentors = mentors.filter(m => !mentorsWithSessions.includes(m._id.toString()));
        res.json(freeMentors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createMentor,
    getMentorSessions,
    countMentorLearners,
    softDeleteMentor,
    getMentorsWithNoActiveSessions
}