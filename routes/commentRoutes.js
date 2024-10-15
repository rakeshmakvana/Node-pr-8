const express = require('express');
const router = express.Router();
const commentCon = require('../controllers/commentCon')
const ensureAuthenticated = require('../configration/auth');

router.post('/comments/:id', ensureAuthenticated, commentCon.addComment);

module.exports = router;
