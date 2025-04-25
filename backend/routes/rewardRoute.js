const express = require('express');
const router = express.Router();

const rewardController = require('../controllers/rewardController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/my-rewards', authMiddleware, rewardController.getUserRewards);

module.exports = router;
