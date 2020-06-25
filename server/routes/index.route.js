const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const projectRoutes = require('./project.route');
const taskRoutes = require('./task.route');
const developersRoutes = require('./developers.route');
const myTasksRoutes = require('./my-tasks.route');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/projects/:projectId/task', taskRoutes);
router.use('/developers', developersRoutes);
router.use('/my-tasks', myTasksRoutes);

module.exports = router;

//     { path: '/project/:projectId' },
//     { path: '/project/:projectId/info' },
//     { path: '/project/new' },

//     { path: '/my-tasks' },
//     { path: '/developers' },

//     { path: '/project/:projectId/task/:taskId' },
//     { path: '/project/:projectId/task/new' }