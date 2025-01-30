const HealthData = require("../models/historyModel");

const getNotifications = async (req, res) => {
  const { city } = req.params;
  try {
    const latestData = await HealthData.getLatestDataByCity(city);
    if (!latestData) return res.status(404).json({ message: "No data available" });

    let riskLevel = "low";
    if (latestData.pm25 > 100 || latestData.pm10 > 150) riskLevel = "high";
    else if (latestData.pm25 > 50 || latestData.pm10 > 100) riskLevel = "medium";

    res.json({
      location: city,
      risk: riskLevel,
      message: `Kualitas udara saat ini di ${city} berada pada tingkat risiko ${riskLevel}.`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

module.exports = { getNotifications };