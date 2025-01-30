const axios = require("axios");

const getAirQualityByCity = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openaq.org/v2/latest?city=${city}`
    );

    if (response.data.results.length === 0) {
      return null;
    }

    const data = response.data.results[0];
    return {
      city: data.city,
      pm25: data.measurements.find((m) => m.parameter === "pm25")?.value || null,
      pm10: data.measurements.find((m) => m.parameter === "pm10")?.value || null,
      no2: data.measurements.find((m) => m.parameter === "no2")?.value || null,
      co: data.measurements.find((m) => m.parameter === "co")?.value || null,
      updatedAt: data.measurements[0]?.lastUpdated || null,
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};

module.exports = { getAirQualityByCity };