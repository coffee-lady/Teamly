const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const projectRoutes = require('./project.route');
const taskRoutes = require('./task.route');
const developersRoutes = require('./developers.route');

router.use('/auth', authRoutes);
router.use('/project', projectRoutes);
router.use('/project/:id/task', taskRoutes);
router.use('/developers', developersRoutes);

module.exports = router;