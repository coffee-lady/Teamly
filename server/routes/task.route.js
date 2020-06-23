const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task.controller');

router.post('/new', taskCtrl.createTask);
router.get('/:taskId', taskCtrl.getTaskInfo);
router.post('/:taskId', taskCtrl.updateTaskInfo);

module.exports = router;