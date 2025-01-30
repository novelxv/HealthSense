const EducationModel = require("../models/educationModel");

const getEducationArticles = async (req, res) => {
  try {
    const articles = await EducationModel.getAllEducationArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching education articles", error });
  }
};

module.exports = { getEducationArticles };