const knex = require("../database/knex");

const saveAirQualityData = async (data) => {
  return await knex("health_data").insert(data).returning("*");
};

// Mengambil data terbaru sebagai fallback jika API gagal
const getLatestDataByCity = async (city) => {
  return await knex("health_data").where("location", city).orderBy("recorded_at", "desc").first();
};

const getHistoricalData = async (city) => {
  return await knex("health_data").where("location", city).orderBy("recorded_at", "desc");
};

module.exports = { saveAirQualityData, getLatestDataByCity, getHistoricalData };