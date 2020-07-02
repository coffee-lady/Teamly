const express = require('express');
const router = express.Router();

const projectCtrl = require('../controllers/project.controller');

router.get('/', projectCtrl.getAllProjects);
router.post('/new', projectCtrl.createProject);
router.post('/search', projectCtrl.findProject);
router.post('/searchById', projectCtrl.findProjectById);
router.get('/:projectId', projectCtrl.getProjectData);
router.post('/:projectId', projectCtrl.updateProject);
router.delete('/:projectId', projectCtrl.deleteProject);

module.exports = router;