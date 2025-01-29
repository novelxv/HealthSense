const knex = require("../database/knex");

const getAllHealthData = async () => {
    return await knex("health_data").select("*");
};

const getHealthDataByLocation = async (location) => {
    return await knex("health_data").where("location", location).first();
};

const addHealthData = async (data) => {
    return await knex("health_data").insert(data).returning("*");
};

module.exports = {
    getAllHealthData,
    getHealthDataByLocation,
    addHealthData,
};