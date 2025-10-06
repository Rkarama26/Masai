const LearnerModel = require('../models/Learner');
const MentorModel = require('../models/Mentor');

const SessionModel = require('../models/Session');

const createLearner = async (req, res) => {
    try {
        const learner = new LearnerModel(req.body);
        await learner.save();
        res.status(201).json({ learner });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getLearnerSessions = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ 'learners.learnerId': req.params.id, isActive: true, isArchived: false })
            .populate('mentorId', 'name expertise')
            .sort({ scheduledAt: -1 });
        res.json(sessions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMentorsForLearner = async (req, res) => {
    try {
        const sessions = await SessionModel.find({ 'learners.learnerId': req.params.id, isActive: true, isArchived: false });
        const mentorSet = new Set(sessions.map(s => s.mentorId.toString()));
        const mentors = await MentorModel.find({ _id: { $in: Array.from(mentorSet) } });
        res.json(mentors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const softDeleteLearner = async (req, res) => {
    try {
        await LearnerModel.findByIdAndUpdate(req.params.id, { isActive: false });
        await SessionModel.updateMany(
            { 'learners.learnerId': req.params.id, scheduledAt: { $gte: new Date() } },
            { $set: { 'learners.$[elem].attendance': 'cancelled' } },
            { arrayFilters: [{ 'elem.learnerId': req.params.id }] }
        );
        res.json({ message: 'Learner soft-deleted and upcoming attendance marked cancelled' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const learnersWithMoreThanNSessions = async (req, res) => {
    try {
        const n = 3;
        const sessions = await SessionModel.find({ isActive: true, isArchived: false });
        const learnerCount = {};
        sessions.forEach(s => {
            s.learners.forEach(l => {
                learnerCount[l.learnerId] = (learnerCount[l.learnerId] || 0) + 1;
            });
        });
        const learners = Object.keys(learnerCount).filter(l => learnerCount[l] > n);
        const result = await LearnerModel.find({ _id: { $in: learners } });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
module.exports = {
    createLearner,
    getLearnerSessions,
    getMentorsForLearner,
    softDeleteLearner,
    learnersWithMoreThanNSessions
}