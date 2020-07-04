const User = require('../models/user.model');
const Project = require('../models/project.model');

function handleError(err, res) {
    res.status(err.status).json({
        message: err.message
    });
    return console.error(err);
}

module.exports.getDevelopers = function(req, res) {
    User
        .find({
            role: 'Developer'
        }, async (err, devs) => {
            if (err) return handleError(err, res);
            if (!devs) res.status(200).json(null);

            for (let dev of devs) {
                delete dev.hashedPassword;
                dev.projectsData = [];
                for (let projId of dev.projects) {
                    let projData = await Project.findById(projId);
                    dev.projectsData.push(projData);
                }
            }

            res.status(200).json(devs);
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
            if (!users) return res.status(200).json(null);;

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

module.exports.deleteDeveloper = function(req, res) {
    User.findByIdAndDelete(req.params.devId, err => {
        if (err) return handleError(err, res);

        res.status(200).end();
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