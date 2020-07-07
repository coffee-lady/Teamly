const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  //project _ids
  projects: [{
    type: String,
  }],
  //tasks _ids
  currentTasks: [{
    type: String,
  }]
}, {
  versionKey: false
});

module.exports = mongoose.model('User', UserSchema, 'users');
