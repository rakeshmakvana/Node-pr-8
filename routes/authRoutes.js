const express = require('express');
const router = express.Router();
const auth = require('../controllers/authCon');
const ensureAuthenticated = require('../configration/auth');

router.get('/profile', ensureAuthenticated, auth.profile)
router.get('/login', auth.loginForm);
router.post('/login', auth.login);
router.get('/signup', auth.signupForm);
router.post('/signup', auth.signup);
router.get('/logout', auth.logout);
router.get('/changepassword', ensureAuthenticated, auth.changepasswordform);
router.post('/changepassword', ensureAuthenticated, auth.changepassword);
router.get('/forgotpassword', auth.forgotpasswordform);
router.post('/forgotpassword', auth.forgotpassword);
router.get('/verify/:id', auth.verifyform);
router.post('/verify/:id', auth.verify);
router.get('/newpassword/:id', auth.newpasswordform);
router.post('/newpassword/:id', auth.newpassword);

module.exports = router;