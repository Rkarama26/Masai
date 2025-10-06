const LearnerModel = require("../models/Learner");
const MentorModel = require("../models/Mentor");
const SessionModel = require("../models/Session");


const createSession = async (req, res) => {
    try {
        const { mentorId, learners, topic, scheduledAt, notes } = req.body;
        const mentor = await MentorModel.findById(mentorId);
        if (!mentor || !mentor.isActive) return res.status(400).json({ error: 'Mentor inactive or not found' });

        const learnerIds = learners.map(l => l.learnerId);
        const validLearners = await LearnerModel.find({ _id: { $in: learnerIds }, isActive: true });
        if (validLearners.length !== learners.length) return res.status(400).json({ error: 'Some learners inactive' });

        const session = new SessionModel({ mentorId, learners, topic, scheduledAt, notes });
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getRecentSessions = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ isActive: true, isArchived: false })
            .populate('mentorId', 'name expertise')
            .populate('learners.learnerId', 'name email')
            .sort({ scheduledAt: -1 })
            .limit(5);
        res.json(sessions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getSessionLearners = async (req, res) => {
    try {
        const session = await SessionModel.findById(req.params.id).populate('learners.learnerId', 'name email');
        res.json(session.learners);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const archiveSession = async (req, res) => {
    try {
        await SessionModel.findByIdAndUpdate(req.params.id, { isActive: false, isArchived: true });
        res.json({ message: 'Session archived' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {
    createSession,
    getRecentSessions,
    getSessionLearners,
    archiveSession
}