const knex = require("../database/knex");

const saveAQIData = async (data) => {
    return await knex("aqi_history").insert(data);
};

const getAQIHistory = async (city, days) => {
    return await knex("aqi_history")
    .where("city", city)
    .where("recorded_at", ">=", knex.raw(`NOW() - INTERVAL '${days} days'`))
    .orderBy("recorded_at", "desc");
};

const getWeeklyAQI = async (city) => {
    return await knex.raw(
        `SELECT date_trunc('week', recorded_at) AS week, AVG(aqi) AS avg_aqi
     FROM aqi_history WHERE city = ? GROUP BY week ORDER BY week DESC LIMIT 4`,
        [city]
    );
};

const getMonthlyAQI = async (city) => {
    return await knex.raw(
        `SELECT date_trunc('month', recorded_at) AS month, AVG(aqi) AS avg_aqi
     FROM aqi_history WHERE city = ? GROUP BY month ORDER BY month DESC LIMIT 12`,
        [city]
    );
};

module.exports = {
    saveAQIData,
    getAQIHistory,
    getWeeklyAQI,
    getMonthlyAQI,
};