const HealthData = require("../models/historyModel");

const getHeatmapData = async (req, res) => {
    try {
        const data = await HealthData.getHeatmapData();
        
        const geoJson = {
            type: "FeatureCollection",
            features: data.map((record) => ({
                type: "Feature",
                properties: {
                    location: record.location,
                    pm25: record.pm25,
                    pm10: record.pm10,
                    no2: record.no2,
                    co: record.co,
                    recorded_at: record.recorded_at,
                },
                geometry: {
                    type: "Point",
                    coordinates: [record.longitude, record.latitude],
                },
            })),
        };
        
        res.json(geoJson);
    } catch (error) {
        res.status(500).json({ message: "Error fetching heatmap data", error });
    }
};

module.exports = { getHeatmapData };