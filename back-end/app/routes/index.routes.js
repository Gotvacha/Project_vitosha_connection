const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const friendshipRoutes = require('./friendship.routes');

router.use('/api/users', userRoutes);
router.use('/api/friendships', friendshipRoutes);

module.exports = router;
