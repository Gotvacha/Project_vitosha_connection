const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/friendship.controller');

router.post('/', FriendshipController.createFriendship);

router.get('/:user_id', FriendshipController.findFriendships);

router.delete('/', FriendshipController.removeFriendship);

module.exports = router;
