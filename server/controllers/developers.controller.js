const User = require('../models/user.model');

function handleError(err, res) {
    res.status(err.status).json({
        message: err.message
    });
    return console.error(err);
}

module.exports = function getDevelopers(req, res) {
    User.find({
        role: 'Developer'
    }, (err, devs) => {
        if (err) return handleError(err, res);

        for (let dev of devs) {
            delete dev.hashedPassword;
            delete dev.currentTasks;
            delete dev.role;
        }

        res.status(200).json({
            developers: devs
        });
    });
};

module.exports = function searchDeveloper(req, res) {
    let searchStr = req.body.searchStr;
    Project
        .find({
            $or: [
                { fullname: new RegExp(searchStr, 'i') },
                { email: new RegExp(searchStr, 'i') }]
        })
        .exec((err, projects) => {
            if (err) return handleError(err, res);

            res.status(201).json({
                projects: projects
            });
        });
};

module.exports = function deleteDeveloper(req, res) {
    User.findByIdAndDelete(req.params.devId, err => {
        if (err) return handleError(err, res);

        res.status(200).end();
    });
};

module.exports = function updateDeveloper(req, res) {
    let data = req.body;
    User
        .findByIdAndUpdate(req.params.devId, {
            projects: data.projects,
            currentTasks: data.currentTasks
        }, err => {
            if (err) return handleError(err, res);
        });
};