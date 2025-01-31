const express = require("express");
const router = express.Router();
const exportController = require("../controllers/exportController");

router.get("/pdf/:city", exportController.exportToPDF);
router.get("/csv/:city", exportController.exportToCSV);

module.exports = router;