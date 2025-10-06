const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');

router.post('/', mentorController.createMentor);
router.get('/:id/sessions', mentorController.getMentorSessions);
router.get('/:id/learners/count', mentorController.countMentorLearners);
router.delete('/:id', mentorController.softDeleteMentor);
router.get('/free/mentors', mentorController.getMentorsWithNoActiveSessions);

module.exports = router;
