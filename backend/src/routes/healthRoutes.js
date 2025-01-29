const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// Routes
router.get("/", healthController.getAllHealthData);
router.get("/:location", healthController.getHealthDataByLocation);
router.post("/", healthController.addHealthData);

module.exports = router;