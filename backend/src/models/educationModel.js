const knex = require("../database/knex");

const getAllEducationArticles = async () => {
  return await knex("education").select("*").orderBy("created_at", "desc");
};

const getEducationByCategory = async (category) => {
  return await knex("education").where("category", category).orderBy("created_at", "desc");
};

const getEducationByLocation = async (location) => {
  return await knex("education")
    .where("location", location)
    .orWhereNull("location")
    .orderBy("created_at", "desc");
};

module.exports = { getAllEducationArticles, getEducationByCategory, getEducationByLocation };