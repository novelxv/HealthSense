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
        
        // Simpan data forecast beberapa hari ke depan
        const forecastData = airQuality.forecast.map((day) => ({
            city: city,
            aqi: day.avg,
            pm25: airQuality.pm25,
            pm10: airQuality.pm10,
            no2: airQuality.no2,
            co: airQuality.co,
            temperature: weather.temperature,
            recorded_at: new Date(day.day), // Simpan sesuai tanggal forecast
        }));
        
        await AQIModel.saveAQIData(forecastData);
        
        // Ambil data AQI hari ini dari database
        const currentAQI = await AQIModel.getCurrentAQI(city);
        
        res.json({ airQuality: currentAQI, weather });
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
};

const getWeeklyAQI = async (req, res) => {
    const { city } = req.params;
    try {
        let data = await AQIModel.getWeeklyAQI(city);
        
        // Jika database kosong, ambil dari API langsung
        if (!data.rows.length) {
            const airQuality = await WAQIService.getAirQualityByCity(city);
            data = airQuality.forecast.slice(0, 7).map(day => ({
                week: day.day,
                avg_aqi: day.avg
            }));
        }
        
        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching weekly AQI", error });
    }
};

const getMonthlyAQI = async (req, res) => {
    const { city } = req.params;
    try {
        let data = await AQIModel.getMonthlyAQI(city);
        
        // Jika database kosong, ambil dari API langsung
        if (!data.rows.length) {
            const airQuality = await WAQIService.getAirQualityByCity(city);
            data = airQuality.forecast.slice(0, 28).reduce((acc, day, index) => {
                const weekIndex = Math.floor(index / 7);
                if (!acc[weekIndex]) acc[weekIndex] = { week: day.day, avg_aqi: 0, count: 0 };
                acc[weekIndex].avg_aqi += day.avg;
                acc[weekIndex].count++;
                return acc;
            }, []).map(week => ({
                week: week.week,
                avg_aqi: week.avg_aqi / week.count
            }));
        }
        
        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching monthly AQI", error });
    }
};

const getYearlyAQI = async (req, res) => {
    const { city } = req.params;
    try {
        let data = await AQIModel.getYearlyAQI(city);

        // Jika database kosong, ambil dari API langsung
        if (!data.rows.length) {
            const airQuality = await WAQIService.getAirQualityByCity(city);
            data = airQuality.forecast.slice(0, 365).reduce((acc, day, index) => {
                const monthIndex = Math.floor(index / 30);
                if (!acc[monthIndex]) acc[monthIndex] = { month: day.day, avg_aqi: 0, count: 0 };
                acc[monthIndex].avg_aqi += day.avg;
                acc[monthIndex].count++;
                return acc;
            }, []).map(month => ({
                month: month.month,
                avg_aqi: month.avg_aqi / month.count
            }));
        }

        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching yearly AQI", error });
    }
};

module.exports = { getCurrentAQIAndWeather, getWeeklyAQI, getMonthlyAQI, getYearlyAQI };