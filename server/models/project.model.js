const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
  }, {
    versionKey: false
  });

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
  managers: [{
    type: String,
  }],
  developers: [{
    type: String,
  }],
  tasks: [TaskSchema]
}, {
  versionKey: false
});

module.exports = mongoose.model('Project', ProjectSchema);