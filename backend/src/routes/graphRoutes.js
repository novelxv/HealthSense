const express = require("express");
const router = express.Router();
const graphController = require("../controllers/graphController");

router.get("/:city/:period", graphController.getGraphData);

module.exports = router;