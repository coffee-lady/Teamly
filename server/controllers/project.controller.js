const User = require('../models/user.model');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

function handleError(err, res) {
    res.status(err.status).json({
        message: err.message
    });
    return console.error(err);
}

module.exports.createProject = function(req, res) {
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
            res.status(200).json(project);
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
        .exec(async (err, project) => {
            if (err) return handleError(err, res);

            let managersData = [],
                developersData = [],
                tasksData = [];
            for (let userId of project.managers.concat(project.developers)) {
                await User
                    .findById(userId)
                    .exec((err, user) => {
                        if (err) return handleError(err, res);

                        if (user.role === 'manager') {
                            managersData.push(user);
                        } else {
                            developersData.push(user);
                        }
                    });
            }
            for (let taskId of project.tasks) {
                await Task
                    .findById(taskId)
                    .exec((err, task) => {
                        if (err) return handleError(err, res);

                        tasksData.push(task);
                    })
            }
            res.status(200).json({
                title: project.title,
                description: project.description,
                createdAt: project.createdAt,
                managersData: managersData,
                developersData: developersData,
                tasksData: tasksData
            });
        });
};

module.exports.updateProject = function(req, res) {
    let data = req.body;
    delete data._id;

    Project.findByIdAndUpdate(req.params.projectId, data, (err, project) => {
        if (err) return handleError(err, res);
        res.status(200).json(project);
    });
};

module.exports.deleteProject = function(req, res) {
    Project.findByIdAndDelete(req.params.projectId, err => {
        if (err) return handleError(err, res);

        res.status(200).end();
    });
};


module.exports.getAllProjects = function(req, res) {
    Project
        .find()
        .exec((err, projects) => {
            if (err) return handleError(err, res);

            res.status(200).json(projects);
        })
};