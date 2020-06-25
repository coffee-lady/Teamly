const User = require('../models/user.model');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

function handleError(err, res) {
    res.status(err.status).json({
        message: err.message
    });
    return console.error(err);
}

module.exports = function createProject(req, res) {
    let data = req.body;
    Project
        .create({
            title: data.title,
            description: data.description,
            managers: data.managers,
            developers: data.developers,
            tasks: []
        })
        .then(project => {
            for (let userId of data.developers.concat(data.managers)) {
                User
                    .findByIdAndUpdate(userId, { $push: { projects: project._id } });
            }
        })
        .catch(err => handleError(err, res));
};

module.exports = function findProject(req, res) {
    let title = req.body.title;
    Project
        .find({
            title: new RegExp(title, 'i')
        })
        .exec((err, projects) => {
            if (err) return handleError(err, res);

            res.status(201).json({
                projects: projects
            });
        });
};

module.exports = function getProjectOverview(req, res) {
    Project
        .findById(req.params.projectId)
        .exec(async (err, project) => {
            if (err) return handleError(err, res);

            let users = [],
                tasks = [];
            for (let userId of project.managers.concat(project.developers)) {
                await User
                    .findById(userId)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);

                        users.push({
                            fullname: user.fullname,
                            role: user.role
                        });
                    })
            }
            for (let taskId of project.tasks) {
                await Task
                    .findById(taskId)
                    .exec((err, task) => {
                        if (err) return handleError(err, res);

                        tasks.push({
                            title: task.title,
                            description: task.description,
                            dueDate: task.dueDate,
                            completed: task.completed
                        });
                    })
            }
            res.status(200).json({
                title: project.title,
                description: project.description,
                createdAt: project.createdAt,
                users: users,
                tasks: tasks
            });
        });
};

module.exports = function getProjectInfo(req, res) {
    Project
        .findById(req.params.projectId)
        .exec(async (err, project) => {
            if (err) return handleError(err, res);

            let users = [];
            for (let userId of project.managers.concat(project.developers)) {
                await User
                    .findById(userId)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);

                        users.push({
                            fullname: user.fullname,
                            email: user.email,
                            role: user.role
                        });
                    })
            }
            res.status(200).json({
                title: project.title,
                description: project.description,
                createdAt: project.createdAt,
                users: users
            });
        });
};

module.exports = function updateProjectInfo(req, res) {
    let data = req.body;
    Project.findByIdAndUpdate(req.params.projectId, {
        title: data.title,
        description: data.description,
        managers: data.managers,
        developers: data.developers
    }, err => {
        if (err) return handleError(err, res);
    });
};

module.exports = function deleteProject(req, res) {
    Project.findByIdAndDelete(req.params.projectId, err => {
        if (err) return handleError(err, res);

        res.status(200).end();
    });
};