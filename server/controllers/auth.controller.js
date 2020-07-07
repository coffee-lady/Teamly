const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const User = require('../models/user.model');

module.exports.generateToken = function(user) {
    const payload = JSON.stringify(user);
    return jwt.sign(payload, config.jwtSecret);
};

module.exports.register = async function(user) {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    return await new User(user).save();
}