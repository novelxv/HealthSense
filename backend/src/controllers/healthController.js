const HealthData = require("../models/healthDataModel");

const getAllHealthData = async (req, res) => {
  try {
    const data = await HealthData.getAllHealthData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

const getHealthDataByLocation = async (req, res) => {
  try {
    const data = await HealthData.getHealthDataByLocation(req.params.location);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

const addHealthData = async (req, res) => {
  try {
    const newData = await HealthData.addHealthData(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: "Error adding data", error });
  }
};

module.exports = { getAllHealthData, getHealthDataByLocation, addHealthData };