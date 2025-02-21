const WAQIService = require("../services/waqiService");
const WeatherService = require("../services/weatherService");
const AQIModel = require("../models/aqiModel");

const getCurrentAQIAndWeather = async (req, res) => {
    const { city } = req.params;
    
    try {
        // Ambil data real-time
        const airQuality = await WAQIService.getAirQualityByCity(city);
        const weather = await WeatherService.getWeatherByCity(city);
        
        if (!airQuality || !weather) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }
        
        // Simpan ke database historis
        await AQIModel.saveAQIData({
            city: city,
            aqi: airQuality.aqi,
            pm25: airQuality.pm25,
            pm10: airQuality.pm10,
            no2: airQuality.no2,
            co: airQuality.co,
            temperature: weather.temperature,
            recorded_at: new Date(),
        });
        
        res.json({ airQuality, weather });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
};

const getWeeklyAQI = async (req, res) => {
    const { city } = req.params;
    try {
        const data = await AQIModel.getWeeklyAQI(city);
        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching weekly AQI", error });
    }
};

const getMonthlyAQI = async (req, res) => {
    const { city } = req.params;
    try {
        const data = await AQIModel.getMonthlyAQI(city);
        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching monthly AQI", error });
    }
};

module.exports = { getCurrentAQIAndWeather, getWeeklyAQI, getMonthlyAQI };