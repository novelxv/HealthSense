const axios = require("axios");

const getAirQualityByCity = async (city) => {
    try {
        const apiKey = process.env.WAQI_API_KEY;
        const response = await axios.get(
            `https://api.waqi.info/feed/${city}/?token=${apiKey}`
        );
        
        if (response.data.status !== "ok") {
            console.error("Error fetching AQI data:", response.data);
            return null;
        }
        
        const airData = response.data.data;
        return {
            city: airData.city.name,
            aqi: airData.aqi,
            pm25: airData.iaqi.pm25 ? airData.iaqi.pm25.v : null,
            pm10: airData.iaqi.pm10 ? airData.iaqi.pm10.v : null,
            no2: airData.iaqi.no2 ? airData.iaqi.no2.v : null,
            co: airData.iaqi.co ? airData.iaqi.co.v : null,
            timestamp: airData.time.iso,
            forecast: airData.forecast ? airData.forecast.daily.pm25 : [],
        };
    } catch (error) {
        console.error("Error fetching air quality data:", error);
        return null;
    }
};

module.exports = { getAirQualityByCity };