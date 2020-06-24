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
  createdAt: {
    type: Date,
    default: new Date()
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  projectName: {
    type: String,
    required: true
  },
  //dev _id
  takenByDev: {
    type: String,
    default: ''
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Task', TaskSchema, 'tasks');
