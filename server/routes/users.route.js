const express = require('express');
const router = express.Router();

const ctrlUsers = require('../controllers/users.controller');

router.get('/developers', ctrlUsers.getDevelopers);
router.post('/search', ctrlUsers.findUsers);
router.post('/searchById', ctrlUsers.findUserById);
router.post('/search', ctrlUsers.findUsers);
router.post('/developers/:devId', ctrlUsers.updateDeveloper);
router.delete('/developers/:devId', ctrlUsers.deleteDeveloper);

module.exports = router;