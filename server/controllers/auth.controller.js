const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');

module.exports = async function register(req, res, next) {
  let user = req.body;
  user = user.toObject();
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  await new User(user).save()
  delete user.hashedPassword;
  req.user = user;
  next()
};

module.exports = function login(req, res) {
  let user = req.user;
  let token = generateToken(user);
  res.json({
    user,
    token
  });
};

function generateToken(user) {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config.jwtSecret);
}
