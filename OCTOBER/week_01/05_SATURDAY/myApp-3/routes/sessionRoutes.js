const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.post('/', sessionController.createSession);
router.get('/recent', sessionController.getRecentSessions);
router.get('/:id/learners', sessionController.getSessionLearners);
router.put('/:id/archive', sessionController.archiveSession);

module.exports = router;
