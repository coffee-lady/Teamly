const express = require('express');
const router = express.Router();

const ctrlDevelopers = require('../controllers/developers.controller');

router.get('/', ctrlDevelopers.getDevelopers);
router.get('/search', ctrlDevelopers.searchDeveloper);
router.post('/:developerId/update', ctrlDevelopers.updateDeveloper);
router.post('/:developerId/delete', ctrlDevelopers.deleteDeveloper);

module.exports = router;