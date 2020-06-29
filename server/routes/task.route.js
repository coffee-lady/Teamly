const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task.controller');

router.post('/new', taskCtrl.createTask);
router.get('/:taskId', taskCtrl.getTaskInfo);
router.post('/:taskId', taskCtrl.updateTask);
router.post('/:taskId/delete', taskCtrl.deleteTask);

module.exports = router;