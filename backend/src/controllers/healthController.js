const OpenAQService = require("../services/openaqService");
const WeatherService = require("../services/weatherService");
const HistoryModel = require("../models/historyModel");

const getAirQualityAndWeather = async (req, res) => {
  const { city } = req.params;

  try {
    // Ambil data dari OpenAQ dan OpenWeatherMap
    const airQuality = await OpenAQService.getAirQualityByCity(city);
    const weather = await WeatherService.getWeatherByCity(city);

    if (!airQuality || !weather) {
      // Jika tidak ada data real-time, ambil dari database historis
      const historicalData = await HistoryModel.getHistoricalData(city);
      if (historicalData.length === 0) {
        return res.status(404).json({ message: "Data not found" });
      }
      return res.json({ message: "Showing historical data", data: historicalData[0] });
    }

    // Simpan data baru ke database
    const newData = {
      location: city,
      pm25: airQuality.pm25,
      pm10: airQuality.pm10,
      no2: airQuality.no2,
      co: airQuality.co,
      temperature: weather.temperature,
      humidity: weather.humidity,
      recorded_at: new Date(),
    };

    await HistoryModel.saveAirQualityData(newData);

    res.json({ airQuality, weather });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

module.exports = { getAirQualityAndWeather, getHistoricalData };