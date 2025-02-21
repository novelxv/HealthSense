const express = require("express");
const router = express.Router();
const { getEducationArticles, getEducationArticleById } = require("../controllers/educationController");

router.get("/", getEducationArticles);
router.get("/:id", getEducationArticleById);

module.exports = router;