const axios = require("axios");

const getAirQualityByCity = async (city) => {
  try {
    const apiKey = process.env.OPENAQ_API_KEY;
    if (!apiKey) throw new Error("API Key for OpenAQ is missing");

    const response = await axios.get(`https://api.openaq.org/v2/latest`, {
      params: { city },
      headers: { "X-API-Key": apiKey },
    });

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
      latitude: data.coordinates?.latitude || null,
      longitude: data.coordinates?.longitude || null,
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};

module.exports = { getAirQualityByCity };