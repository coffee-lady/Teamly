const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task.controller');

router.post('/project-:projectId/new', taskCtrl.createTask);
router.get('/project-:projectId/task-:taskId', taskCtrl.getTaskData);
router.post('/project-:projectId/task-:taskId', taskCtrl.updateTask);
router.delete('/project-:projectId/task-:taskId', taskCtrl.deleteTask);

module.exports = router;