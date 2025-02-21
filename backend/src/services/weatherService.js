const axios = require("axios");

const getWeatherByCity = async (city) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        
        return {
            city: response.data.name,
            temperature: response.data.main.temp,
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

module.exports = { getWeatherByCity };