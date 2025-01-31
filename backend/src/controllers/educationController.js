const EducationModel = require("../models/educationModel");

const getEducationArticles = async (req, res) => {
  try {
    const { category, location } = req.query;

    let articles;
    if (category) {
      articles = await EducationModel.getEducationByCategory(category);
    } else if (location) {
      articles = await EducationModel.getEducationByLocation(location);
    } else {
      articles = await EducationModel.getAllEducationArticles();
    }

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching education articles", error });
  }
};

module.exports = { getEducationArticles };