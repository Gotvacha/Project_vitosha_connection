const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/', UserController.createAccount);

router.get('/:username', UserController.findUsers);

router.delete('/:username', UserController.deleteAccount);

router.delete('/', UserController.deleteAll);

module.exports = router;
