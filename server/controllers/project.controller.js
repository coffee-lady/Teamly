const User = require('../models/user.model');
const Task = require('../models/task.model');
const Project = require('../models/project.model');
const { resolve } = require('path');

function handleError(err, res) {
    res.json({
        message: err.message
    });
    return console.error(err);
}

module.exports.createProject = function(req, res) {
    let data = req.body;
    delete data._id;
    Project
        .create(data)
        .then(project => data.developers.concat(data.managers).map(userId =>
            new Promise(resolve => {
                User.findByIdAndUpdate(userId, { $push: { projects: project._id } }, err => {
                    if (err) return handleError(err, res);
                    resolve();
                });
            })))
        .then((usersUpdated) => Promise.all(usersUpdated))
        .then(() => {
            res.status(200).end();
        })
        .catch(err => handleError(err, res));
};

module.exports.findProject = function(req, res) {
    let title = req.body.title;
    Project
        .find({
            title: new RegExp(title, 'i')
        })
        .exec((err, projects) => {
            if (err) return handleError(err, res);
            if (!projects) return res.status(201).json(null);

            res.status(201).json(projects);
        });
};

module.exports.findProjectById = function(req, res) {
    Project
        .findById(req.body.projectId)
        .exec((err, project) => {
            if (err) return handleError(err, res);

            res.status(201).json(project);
        });
};

module.exports.getProjectData = function(req, res) {
    Project
        .findById(req.params.projectId)
        .exec((err, projectDoc) => {
            if (err) {
                handleError(err, res);
                return;
            };
            if (!projectDoc) return res.status(200).json({});

            let project = projectDoc.toObject();
            let managersDataPromise = project.managers.map(userId =>
                new Promise(resolve => User
                    .findById(userId)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);
                        if (user.role === 'Manager') {
                            resolve(user);
                        }
                    }))
            );
            let developersDataPromise = project.developers.map(userId =>
                new Promise(resolve => User
                    .findById(userId)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);
                        if (user.role === 'Developer') {
                            resolve(user);
                        }
                    })));
            let tasksDataPromise = project.tasks.map(taskId =>
                new Promise(resolve => Task
                    .findById(taskId)
                    .exec((err, task) => {
                        if (err) return handleError(err, res);
                        resolve(task);
                    })));

            let managersData = Promise.all(managersDataPromise)
                .then(data => project.managersData = data)
                .catch(err => handleError(err, res));

            let developersData = Promise.all(developersDataPromise)
                .then(data => project.developersData = data)
                .catch(err => handleError(err, res));

            let tasksData = Promise.all(tasksDataPromise)
                .then(data => project.tasksData = data)
                .catch(err => handleError(err, res));

            Promise.all([managersData, developersData, tasksData])
                .then(() => {
                    res.status(200).json(project);
                })
                .catch(err => handleError(err, res));
        });
};

module.exports.updateProject = function(req, res) {
    let data = req.body;
    delete data._id;
    const projectId = req.params.projectId;

    Project.findById(projectId, (err, project) => {
        if (err) return handleError(err, res);

        const oldDevsRemove = project.developers.map(oldDev => {
            if (!data.developers.find(newDev => newDev === oldDev)) {
                return new Promise(resolve => {
                    User.findById(oldDev).exec((err, user) => {
                        if (err) return handleError(err, res);
                        for (let project of user.projects) {
                            if (project == projectId) {
                                user.projects.splice(user.projects.indexOf(projectId), 1);
                            }
                        }
                        user.save((err) => {
                            if (err) return handleError(err, res);
                            resolve();
                        })
                    })
                })
            } else resolve();
        });

        Promise.all(oldDevsRemove)
            .then(() => {
                return data.developers.map(newDev => new Promise(resolve => {
                    if (!project.developers.find(oldDev => oldDev === newDev)) {
                        User.findByIdAndUpdate(newDev, { $push: { projects: projectId } }, err => {
                            if (err) return handleError(err, res);
                            resolve();
                        });
                    } else resolve();
                }));
            })
            .then(newDevsUpdate => Promise.all(newDevsUpdate))
            .then(() => {
                for (let key of Object.keys(data)) {
                    project[key] = data[key];
                }
                return project.save()
            })
            .then(() => {
                res.status(200).end()
            })
            .catch(err => handleError(err, res));

    });
};

module.exports.deleteProject = function(req, res) {

    Project.findById(req.params.projectId, (err, project) => {
        if (err) handleError(err, res);

        const updateUsers = project.developers
            .concat(project.managers)
            .map(userId => new Promise(resolve => {
                User.findById(userId, (err, user) => {
                    if (err) handleError(err, res);

                    for (let projId of user.projects) {
                        if (projId === projectId) {
                            user.projects.splice(user.projects.indexOf(projId), 1);
                        }
                    }
                    user.save()
                        .then(() => resolve())
                        .catch(err => handleError(err, res));
                });
            }));

        const updateTasks = project.tasks.map(taskId => new Promise(resolve => {
            Task.findById(taskId, (err, task) => {
                task.projectId = null;
                task.save()
                    .then(() => resolve())
                    .catch(err => handleError(err, res));
            });
        }));

        Promise.all([
                new Promise(resolve => {
                    Promise.all(updateUsers)
                        .then(() => resolve())
                        .catch(err => handleError(err, res));
                }),
                new Promise(resolve => {
                    Promise.all(updateTasks)
                        .then(() => resolve())
                        .catch(err => handleError(err, res));
                }),
                Task.deleteOne({ _id: task._id }, (err => {
                    if (err) return handleError(err, res)
                }))
            ])
            .then(() => {
                res.status(200).end();
            })
            .catch(err => handleError(err, res));
    });
};

module.exports.getAllProjects = function(req, res) {
    Project
        .find()
        .exec((err, projects) => {
            if (err) return handleError(err, res);
            if (!projects) return res.status(201).json(null);

            res.status(200).json(projects);
        })
};