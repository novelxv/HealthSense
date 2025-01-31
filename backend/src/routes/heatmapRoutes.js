const express = require("express");
const router = express.Router();
const heatmapController = require("../controllers/heatmapController");

router.get("/", heatmapController.getHeatmapData);

module.exports = router;