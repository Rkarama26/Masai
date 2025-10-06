const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.post('/', learnerController.createLearner);
router.get('/:id/sessions', learnerController.getLearnerSessions);
router.get('/:id/mentors', learnerController.getMentorsForLearner);
router.delete('/:id', learnerController.softDeleteLearner);
router.get('/frequent', learnerController.learnersWithMoreThanNSessions);

module.exports = router;
