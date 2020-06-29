const express = require('express');
const router = express.Router();

const ctrlDevelopers = require('../controllers/developers.controller');

router.get('/', ctrlDevelopers.getDevelopers);
router.post('/search', ctrlDevelopers.searchDeveloper);
router.post('/:devId', ctrlDevelopers.updateDeveloper);
router.delete('/:devId', ctrlDevelopers.deleteDeveloper);

module.exports = router;