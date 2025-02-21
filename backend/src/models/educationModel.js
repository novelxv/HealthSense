const knex = require("../database/knex");

const getAllEducationArticles = async () => {
    return await knex("education").select("*");
};

const getEducationByCategory = async (category) => {
    return await knex("education").where({ category }).select("*");
};

const getEducationByLocation = async (location) => {
    return await knex("education").where({ location }).select("*");
};

const getEducationById = async (id) => {
    return await knex("education").where({ id }).first();
};

module.exports = {
    getAllEducationArticles,
    getEducationByCategory,
    getEducationByLocation,
    getEducationById,
};