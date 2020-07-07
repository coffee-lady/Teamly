const User = require('../models/user.model');
const Project = require('../models/project.model');

function handleError(err, res) {
    res.json({
        message: err.message
    });
    return console.error(err);
}

module.exports.getDevelopers = function(req, res) {
    User
        .find({
            role: 'Developer'
        })
        .exec((err, devs) => {
            if (err) return handleError(err, res);
            if (!devs) res.status(400).json(null);

            let getDevsData = devs.map(dev => new Promise(resolve => {
                let developer = dev.toObject();
                delete developer.hashedPassword;
                developer.projectsData = [];
                let getProjectsData = developer.projects.map(projectId =>
                    new Promise(resolve =>
                        Project.findById(projectId)
                        .exec((err, project) => {
                            if (err) return handleError(err, res);
                            resolve(project);
                        })))
                Promise
                    .all(getProjectsData)
                    .then(projects => {
                        developer.projectsData = projects;
                        resolve(developer);
                    })
                    .catch(err => handleError(err, res));
            }));

            Promise
                .all(getDevsData)
                .then(devsData => {
                    res.status(200).json(devsData);
                })
                .catch(err => handleError(err, res));
        });
};

module.exports.findUsers = function(req, res) {
    let searchStr = req.body.searchString;
    let userRole = req.body.role;

    User
        .find({
            $or: [
                { fullname: new RegExp(searchStr, 'i') },
                { email: new RegExp(searchStr, 'i') }
            ],
            role: userRole
        })
        .exec((err, users) => {
            if (err) return handleError(err, res);

            res.status(200).json(users);
        });
};

module.exports.findUserById = function(req, res) {
    let id = req.body.id;
    User
        .findById(id)
        .exec((err, user) => {
            if (err) return handleError(err, res);

            res.status(201).json(user);
        });
};

module.exports.updateDeveloper = function(req, res) {
    let data = req.body;
    delete data._id;

    User
        .findByIdAndUpdate(req.params.devId, data, (err, dev) => {
            if (err) return handleError(err, res);
            res.status(201).json(dev);
        });
};

module.exports.deleteDeveloper = function(req, res) {
    User.findById(req.params.devId, (err, user) => {
        if (err) return handleError(err, res);

        const projectsUpdate = user.projects.map(projectId => new Promise(resolve => {
            Project
                .findById(projectId)
                .exec((err, project) => {
                    if (err) return handleError(err, res);

                    for (let dev in project.developers) {
                        if (dev._id === user._id) {
                            project.developers.splice(project.developers.indexOf(dev), 1);
                            project.save()
                                .then(resolve())
                                .catch(err => handleError(err, res));
                        }
                    }
                });
        }));

        const tasksUpdate = user.currentTasks.map(taskId => new Promise(resolve => {
            Task
                .findById(taskId)
                .exec((err, task) => {
                    if (err) return handleError(err, res);

                    if (dev._id === task.takenByDev) {
                        task.takenByDev = '';
                        task.save()
                            .then(resolve())
                            .catch(err => handleError(err, res));
                    }
                });
        }));

        Promise
            .all([
                Promise.all(projectsUpdate),
                Promise.all(tasksUpdate)
            ])
            .then(() => new Promise(resolve =>
                User.findByIdAndDelete(user._id, () => resolve())))
            .then(() => {
                res.status(200).end();
            })
            .catch(err => handleError(err, res));
    });
};

module.exports.checkUserExisting = function(req, res) {
    let searchStr = req.body.searchString;

    User
        .findOne({
            email: searchStr
        })
        .exec((err, user) => {
            if (err) return handleError(err, res);

            res.status(200).json(user);
        });
};