const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler')
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(authCtrl.register), authCtrl.login);
router.post('/login', passport.authenticate('local', { session: false }), authCtrl.login);