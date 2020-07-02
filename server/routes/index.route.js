const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const projectRoutes = require('./project.route');
const taskRoutes = require('./task.route');
const usersRoutes = require('./users.route');
const myTasksRoutes = require('./my-tasks.route');

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/projects/:projectId/tasks', taskRoutes);
router.use('/users', usersRoutes);
router.use('/my-tasks', myTasksRoutes);

module.exports = router;