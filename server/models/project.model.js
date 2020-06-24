const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  //managers _ids
  managers: [{
    type: String,
  }],
  //developers _ids
  developers: [{
    type: String,
  }],
  //tasks _ids
  tasks: [{
    type: String,
  }]
}, {
  versionKey: false
});

module.exports = mongoose.model('Project', ProjectSchema, 'projects');