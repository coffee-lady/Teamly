const User = require('../models/user.model');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

function handleError(err, res) {
    res.status(err.status).json({
        message: err.message
    });
    return console.error(err);
}

module.exports.createTask = async function (req, res) {
    let data = req.body;
    let task = new Task(data);
    await Project.findByIdAndUpdate(data.projectId, {
        $push: {
            tasks: task._id
        }
    }, err => {
        if (err) handleError(err, res);
    });

    if (data.takenByDev) {
        User.findByIdAndUpdate(data.takenByDev, { $push: { currentTasks: task._id } }, err => {
            if (err) handleError(err, res);
        });
    }

    task.save().catch(err => handleError(err, res));

    res.status(200).json(task);
};

module.exports.getTaskData = function (req, res) {
    Task
        .findById(req.params.taskId)
        .exec(async (err, task) => {
            if (err) handleError(err, res);

            await Project
                .findById(req.params.projectId)
                .exec(async (err, project) => {
                    if (err) return handleError(err, res);
                    task.projectData = project;
                });

            if (task.takenByDev) {
                await User
                    .findById(task.takenByDev)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);
                        task.developerData = user;
                    });
            }
            res.status(200).json(task);
        });
};

module.exports.updateTask = function (req, res) {
    let data = req.body;
    delete data._id;
    Task
        .findByIdAndUpdate(req.params.taskId, data, (err, task) => {
            if (err) handleError(err, res);
            res.status(200).json(task);
        });
};

module.exports.deleteTask = function (req, res) {
    Task.findById(req.params.taskId, async (err, task) => {
        if (err) handleError(err, res);

        if (task.takenByDev) {
            await User
                .findById(task.takenByDev, (err, dev) => {
                    if (err) handleError(err, res);

                    dev.currentTasks.find((taskId, index) => {
                        dev.currentTasks = taskId === this.task._id ? dev.currentTasks.splice(index, 1) : dev.currentTasks;
                    });
                    dev.save(err => {
                        if (err) return handleError(err, res);
                    });
                });
        }

        await Project
            .findById(task.projectId, (err, project) => {
                if (err) handleError(err, res);

                project.tasks.find((taskId, index) => {
                    project.tasks = taskId === this.task._id ? project.tasks.splice(index, 1) : project.tasks;
                });
                project.save(err => {
                    if (err) return handleError(err, res);
                });
            });

        Task.deleteOne({ _id: task._id }).catch(err => handleError(err, res));

        res.status(200).end();
    });
};

module.exports.getMyTasks = function (req, res) {
    User
        .findById(req.query.id)
        .exec(async (err, user) => {
            if (err) return handleError(err, res);

            let tasks = [];
            for (let taskId of user.currentTasks) {
                await Task.findById(taskId).exec((err, task) => {
                    if (err) return handleError(err, res);
                    tasks.push(task);
                });
            }
            res.status(200).json(tasks);
        });
};