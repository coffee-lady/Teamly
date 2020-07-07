const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler')
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);

module.exports = router;

async function register(req, res, next) {
    let user = await authCtrl.register(req.body);
    delete user.hashedPassword;
    req.user = user;
    next()
}

function login(req, res) {
    let user = req.user;   
    if (!user) {
        return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    let token = authCtrl.generateToken(user);
    res.status(200).json({ user: user, token: token });
}