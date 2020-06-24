const express = require('express');
const router = express.Router();

const ctrlDevelopers = require('../controllers/developers.controller');

router.get('/', ctrlDevelopers.getDevelopers);
router.get('/search', ctrlDevelopers.searchDeveloper);
router.post('/:devId/update', ctrlDevelopers.updateDeveloper);
router.post('/:devId/delete', ctrlDevelopers.deleteDeveloper);

module.exports = router;