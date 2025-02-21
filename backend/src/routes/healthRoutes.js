const express = require("express");
const router = express.Router();
const healthController = require("../controllers/aqiController");

router.get("/current/:city", healthController.getCurrentAQIAndWeather);
router.get("/weekly/:city", healthController.getWeeklyAQI);
router.get("/monthly/:city", healthController.getMonthlyAQI);
router.get("/yearly/:city", healthController.getYearlyAQI);

module.exports = router;