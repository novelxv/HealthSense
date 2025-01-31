const HealthData = require("../models/historyModel");

const getGraphData = async (req, res) => {
  const { city, period } = req.params;
  
  let days = 7; // Default per minggu
  if (period === "month") days = 30;
  if (period === "year") days = 365;

  try {
    const data = await HealthData.getHistoricalData(city, days);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching graph data", error });
  }
};

module.exports = { getGraphData };