const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.post("/", subscriptionController.subscribeEmail);

module.exports = router;