const express = require('express');
const rewardRouter = express.Router();

const rewardController = require('../controllers/rewardController');
const { authMiddleware } = require('../middleware/auth');

rewardRouter.post('/myRewards', authMiddleware, rewardController.getUserRewards);

module.exports = rewardRouter;
