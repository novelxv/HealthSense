const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

router.get("/current/:city", healthController.getCurrentAQIAndWeather);
router.get("/weekly/:city", healthController.getWeeklyAQI);
router.get("/monthly/:city", healthController.getMonthlyAQI);

module.exports = router;