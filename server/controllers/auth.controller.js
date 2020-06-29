const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const User = require('../models/user.model');

function handleError(err, res) {
  res.status(err.status).json({
      message: err.message
  });
  return console.error(err);
}

module.exports = async function register(req, res, next) {
    let user = req.body;
    user = user.toObject();
    if (userExists(user.email)) {
        res.status(400).json({
            message: "User already exists."
        });
        return;
    }
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    await new User(user).save()
    delete user.hashedPassword;
    req.user = user;
    next()
};

async function userExists(email) {
    let userExists;
    await User
        .findOne({
            email: email
        })
        .then(user => {
            userExists = user ? true : false;
        })
        .catch(err => handleError(err, res));
    return userExists;
}

module.exports = function login(req, res) {
    let user = req.user;
    let token = generateToken(user);
    res.json({
        user,
        token
    });
};

module.exports = function logOut(req, res) {
    req.logout();
};

function generateToken(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
}