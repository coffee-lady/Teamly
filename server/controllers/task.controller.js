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

module.exports.createTask = function(req, res) {
    let data = req.body;
    delete data._id;

    Task.create(data)
        .then(task => {
            return Promise.all([
                new Promise(resolve => {
                    Project.findByIdAndUpdate(data.projectId, {
                        $push: {
                            tasks: task._id
                        }
                    }, err => {
                        if (err) { return handleError(err, res); }
                        resolve();
                    });
                }),
                new Promise(resolve => {
                    if (data.takenByDev) {
                        User.findByIdAndUpdate(data.takenByDev, { $push: { currentTasks: task._id } }, err => {
                            if (err) { return handleError(err, res); }
                            resolve();
                        });
                    } else resolve();
                })
            ]);
        })
        .then(() => {
            res.status(200).end();
        })
        .catch(err => handleError(err, res));
};

module.exports.getTaskData = function(req, res) {
    Task
        .findById(req.params.taskId)
        .exec((err, taskDoc) => {
            if (err) handleError(err, res);
            task = taskDoc.toObject();

            Promise.all([
                    new Promise(resolve => {
                        Project
                            .findById(req.params.projectId)
                            .exec((err, project) => {
                                if (err) return handleError(err, res);
                                resolve(project)
                            });
                    }),
                    new Promise(resolve => {
                        if (task.takenByDev) {
                            User
                                .findById(task.takenByDev)
                                .exec((err, user) => {
                                    if (err) return handleError(err, res);
                                    resolve(user)
                                });
                        } else resolve({});
                    }),
                ])
                .then(results => {
                    task.projectData = results[0];
                    task.developerData = results[1];

                    res.status(200).json(task);
                })
                .catch(err => handleError(err, res));
        });
};

module.exports.updateTask = function(req, res) {
    let data = req.body;
    delete data._id;

    Task
        .findById(req.params.taskId, (err, task) => {
            if (err) handleError(err, res);

            const updateOldDev = new Promise(resolve => {
                if (task.takenByDev && task.takenByDev !== data.takenByDev) {
                    User
                        .findById(data.takenByDev)
                        .exec((err, dev) => {
                            if (err) handleError(err, res);

                            for (let taskId of dev.currentTasks) {
                                if (taskId === task.takenByDev) {
                                    dev.currentTasks.splice(dev.currentTasks.indexOf(taskId), 1);
                                    dev.save()
                                        .then(() => resolve())
                                        .catch(err => handleError(err, res));
                                }
                            }
                        })
                } else resolve()
            });

            updateOldDev.then(() => new Promise(resolve => {
                    if (data.takenByDev && data.takenByDev !== task.takenByDev) {
                        User
                            .findById(data.takenByDev)
                            .exec((err, dev) => {
                                if (err) handleError(err, res);

                                if (!dev.currentTasks.find(taskId => taskId === data.takenByDev)) {
                                    dev.currentTasks.push(data.takenByDev);
                                }
                                dev
                                    .save()
                                    .then(() => resolve())
                                    .catch(err => handleError(err, res));
                            })
                    } else resolve();
                }))
                .then(() => {
                    for (let key of Object.keys(data)) {
                        task[key] = data[key];
                    }
                    return task.save()
                })
                .then(() => {
                    res.status(200).end();
                })
                .catch(err => handleError(err, res));
        });
};

module.exports.deleteTask = function(req, res) {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) handleError(err, res);

        Promise.all([
                new Promise(resolve => {
                    if (task.takenByDev) {
                        User
                            .findById(task.takenByDev, (err, dev) => {
                                if (err) handleError(err, res);

                                for (let taskId of dev.currentTasks) {
                                    dev.currentTasks =
                                        taskId === req.params.taskId ?
                                        dev.currentTasks.splice(dev.currentTasks.indexOf(taskId), 1) :
                                        dev.currentTasks;
                                }
                                dev.save(err => {
                                    if (err) return handleError(err, res);
                                    resolve();
                                });
                            });
                    } else resolve();
                }),
                new Promise(resolve => {
                    Project
                        .findById(task.projectId, (err, project) => {
                            if (err) handleError(err, res);

                            for (let taskId of project.tasks) {
                                project.tasks =
                                    taskId === req.params.taskId ?
                                    project.tasks.splice(project.tasks.indexOf(taskId), 1) :
                                    project.tasks;
                            }
                            project.save(err => {
                                if (err) return handleError(err, res);
                                resolve();
                            });
                        });
                }),
                Task.deleteOne({ _id: task._id }, (err => {
                    if (err) return handleError(err, res);
                    resolve();
                }))
            ])
            .then(() => {
                res.status(200).end();
            })
            .catch(err => handleError(err, res));
    });
};

module.exports.getMyTasks = function(req, res) {
    User
        .findById(req.query.id)
        .exec((err, user) => {
            if (err) return handleError(err, res);
            if (!user.currentTasks) return res.status(200).json([]);

            let tasksDataPromise = user.currentTasks.map(taskId => new Promise(resolve => {
                console.log(taskId);
                
                Task
                    .findById(taskId)
                    .exec((err, taskDoc) => {
                        if (err) return handleError(err, res);
                        let task = taskDoc.toObject();

                        Project.findById(task.projectId)
                            .exec((err, project) => {
                                if (err) return handleError(err, res);
                                task.projectData = project;
                                resolve(task);
                            });
                    })
            }));

            Promise.all(tasksDataPromise)
                .then(data => {
                    res.status(200).json(data)
                })
                .catch(err => handleError(err, res));
        });
};