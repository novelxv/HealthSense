const axios = require("axios");

const getAirQualityByCity = async (city) => {
    try {
        const token = process.env.WAQI_API_KEY;
        const response = await axios.get(`https://api.waqi.info/feed/${city}/?token=${token}`);
        
        if (response.data.status !== "ok") return null;
        
        return {
            city: response.data.data.city.name,
            aqi: response.data.data.aqi,
            pm25: response.data.data.iaqi.pm25?.v || null,
            pm10: response.data.data.iaqi.pm10?.v || null,
            no2: response.data.data.iaqi.no2?.v || null,
            co: response.data.data.iaqi.co?.v || null,
            timestamp: response.data.data.time.iso,
            forecast: response.data.data.forecast.daily.pm25.map(day => ({
                day: day.day,
                avg: day.avg
            }))
        };
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        return null;
    }
};

module.exports = { getAirQualityByCity };