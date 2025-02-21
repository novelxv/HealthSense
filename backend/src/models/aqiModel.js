const knex = require("../database/knex");

// Simpan data AQI untuk beberapa hari (forecast dari WAQI)
const saveAQIData = async (data) => {
    return await knex("aqi_history").insert(data);
};

// Ambil data AQI hanya untuk hari ini
const getCurrentAQI = async (city) => {
    return await knex("aqi_history")
    .where("city", city)
    .whereRaw("DATE(recorded_at) = CURRENT_DATE") // Hanya hari ini
    .orderBy("recorded_at", "desc")
    .first();
};

// Ambil data AQI rata-rata 7 hari terakhir
const getWeeklyAQI = async (city) => {
    return await knex.raw(
        `SELECT DATE(recorded_at) AS day, AVG(aqi) AS avg_aqi
         FROM aqi_history 
         WHERE city = ? AND recorded_at >= NOW() - INTERVAL '7 days' 
         GROUP BY day 
         ORDER BY day DESC`,
        [city]
    );
};

// Ambil data AQI rata-rata 4 minggu terakhir
const getMonthlyAQI = async (city) => {
    return await knex.raw(
        `SELECT date_trunc('week', recorded_at) AS week, AVG(aqi) AS avg_aqi
         FROM aqi_history 
         WHERE city = ? AND recorded_at >= NOW() - INTERVAL '4 weeks'
         GROUP BY week 
         ORDER BY week DESC`,
        [city]
    );
};

const getYearlyAQI = async (city) => {
    return await knex.raw(
        `SELECT date_trunc('month', recorded_at) AS month, AVG(aqi) AS avg_aqi
         FROM aqi_history 
         WHERE city = ? AND recorded_at >= NOW() - INTERVAL '12 months'
         GROUP BY month 
         ORDER BY month DESC`,
        [city]
    );
};

const getAllAQIData = async (city) => {
    return await knex("aqi_history")
        .where("city", city)
        .orderBy("recorded_at", "desc");
};

module.exports = {
    saveAQIData,
    getCurrentAQI,
    getWeeklyAQI,
    getMonthlyAQI,
    getYearlyAQI,
    getAllAQIData
};