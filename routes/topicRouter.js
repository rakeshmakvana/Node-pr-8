const express = require('express');
const router = express.Router();
const topicCon = require('../controllers/topicCon');
const ensureAuthenticated = require('../configration/auth');

router.get('/addtopic', ensureAuthenticated, topicCon.addTopicForm);
router.post('/addtopic', ensureAuthenticated, topicCon.addTopic);

module.exports = router;
