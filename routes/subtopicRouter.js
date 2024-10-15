const express = require('express');
const router = express.Router();
const subtopicCon = require('../controllers/subtopicCon');
const ensureAuthenticated = require('../configration/auth');

router.get('/addsubtopic', ensureAuthenticated, subtopicCon.addSubTopicForm);
router.post('/addsubtopic', ensureAuthenticated, subtopicCon.addSubTopic);
router.get('/alltopics', ensureAuthenticated, subtopicCon.allTopics);

module.exports = router;
