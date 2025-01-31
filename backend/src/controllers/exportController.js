const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");
const HealthData = require("../models/historyModel");
const fs = require("fs");

const exportToPDF = async (req, res) => {
    try {
        const { city } = req.params;
        const data = await HealthData.getHistoricalData(city);
        
        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", `attachment; filename=${city}_air_quality.pdf`);
        res.setHeader("Content-Type", "application/pdf");
        
        doc.pipe(res);
        doc.fontSize(20).text(`Laporan Kualitas Udara - ${city}`, { align: "center" });
        doc.moveDown();
        
        data.forEach((record) => {
            doc.fontSize(12).text(`Tanggal: ${record.recorded_at}`);
            doc.text(`PM2.5: ${record.pm25}, PM10: ${record.pm10}, NO2: ${record.no2}, CO: ${record.co}`);
            doc.moveDown();
        });
        
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error exporting PDF", error });
    }
};

const exportToCSV = async (req, res) => {
    try {
        const { city } = req.params;
        const data = await HealthData.getHistoricalData(city);
        
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);
        
        res.setHeader("Content-Disposition", `attachment; filename=${city}_air_quality.csv`);
        res.setHeader("Content-Type", "text/csv");
        
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: "Error exporting CSV", error });
    }
};

module.exports = { exportToPDF, exportToCSV };