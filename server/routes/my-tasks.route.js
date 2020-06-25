const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task.controller');

router.get('/', taskCtrl.getMyTasks);

module.exports = router;