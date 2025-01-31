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

const getHeatmapData = async () => {
    return await knex("health_data")
    .select("location", "pm25", "pm10", "no2", "co", "latitude", "longitude", "recorded_at")
    .orderBy("recorded_at", "desc")
    .limit(100);
};

module.exports = { saveAirQualityData, getLatestDataByCity, getHistoricalData, getHeatmapData };