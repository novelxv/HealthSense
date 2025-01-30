const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get("/:city", healthController.getAirQualityAndWeather);
router.get("/history/:city", healthController.getHistoricalData);

module.exports = router;