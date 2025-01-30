const knex = require("../database/knex");

const getAllEducationArticles = async () => {
  return await knex("education").select("*");
};

module.exports = { getAllEducationArticles };