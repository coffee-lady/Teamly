const User = require('../models/user.model');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

module.exports = async function createTask(req, res) {
  let data = req.body;
  let task = new Task({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate
  });
  let project = await Project.findByIdAndUpdate(req.params.projectId, {
    $push: {
      tasks: task._id
    }
  }, err => {
    if (err) return console.error(err);
  });
  task.projectName = project.title;
  if (data.developer) {
    let dev = await User.findOneAndUpdate({
      email: data.developer
    }, {
      $push: {
        currentTasks: task._id
      }
    }, err => {
      if (err) console.error(err);
    });
    if (dev) {
      task.takenByDev = dev._id;
    }
    Task.save(err => {
      if (err) console.error(err);
    });

    dev ? res.status(400).json({
      message: 'Incorrect developer email. The task was saved without assigned developer.'
    }) : res.status(200).end()
  }
};

module.exports = function getTaskInfo(req, res) {
  Task
    .findById(req.params.taskId)
    .exec((err, task) => {
      if (err) return console.error(err);
      res.status(200).json({
        title: task.title,
        description: task.description,
        createdAt: task.createdAt,
        dueDate: task.dueDate,
        projectName: task.projectName,
        takenByDev: task.takenByDev
      });
    });
};

module.exports = function updateTaskInfo(req, res) {
  let data = req.body;
  Task
    .findByIdAndUpdate(req.params.taskId, {
      title: data.title,
      description: data.description,
      createdAt: data.createdAt,
      dueDate: data.dueDate,
      completed: data.completed,
      takenByDev: data.takenByDev
    }, err => {
      if (err) return console.error(err);
    });
  res.status(200).end();
};

module.exports = function deleteTask(req, res) {
  Task.findByIdAndDelete(req.params.taskId, err => {
    if (err) return console.error(err);
    res.status(200).end();
  });
};
