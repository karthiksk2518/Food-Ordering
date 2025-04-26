const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.js");
const { userRewards, getRewardSummary, useRewardPoints } = require("../controllers/rewardController.js");

router.post("/userRewards", authMiddleware, userRewards);
router.post("/getRewardSummary", authMiddleware, getRewardSummary);
router.post("/useRewardPoints", authMiddleware, useRewardPoints);

module.exports = router;