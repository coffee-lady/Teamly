const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const User = require('../models/user.model');

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
    .catch(err => console.error(err));
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
  res.redirect('/');
};

function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
