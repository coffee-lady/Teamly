const express = require('express');
const router = express.Router();

const projectCtrl = require('../controllers/project.controller');

router.post('/new', projectCtrl.createProject);
router.post('/search', projectCtrl.findProject);
router.get('/:projectId', projectCtrl.getProjectOverview);
router.get('/:projectId/info', projectCtrl.getProjectInfo);
router.post('/:projectId/info', projectCtrl.updateProjectInfo);

module.exports = router;