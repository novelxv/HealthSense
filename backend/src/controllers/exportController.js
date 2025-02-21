const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");
const AQIModel = require("../models/aqiModel");

const exportToPDF = async (req, res) => {
    try {
        const { city } = req.params;
        const data = await AQIModel.getAllAQIData(city);

        if (!data.length) {
            return res.status(404).json({ message: "Tidak ada data historis untuk kota ini" });
        }

        // Kelompokkan data berdasarkan tanggal (hanya satu entry per hari)
        const groupedData = {};
        data.forEach((record) => {
            const date = new Date(record.recorded_at).toISOString().split("T")[0];
            if (!groupedData[date]) {
                groupedData[date] = { count: 0, aqi: 0, pm25: 0, pm10: 0, no2: 0, co: 0 };
            }
            groupedData[date].count += 1;
            groupedData[date].aqi += record.aqi || 0;
            groupedData[date].pm25 += record.pm25 || 0;
            groupedData[date].pm10 += record.pm10 || 0;
            groupedData[date].no2 += record.no2 || 0;
            groupedData[date].co += record.co || 0;
        });

        // Ambil rata-rata per hari
        const formattedData = Object.keys(groupedData).map((date) => ({
            date,
            aqi: (groupedData[date].aqi / groupedData[date].count).toFixed(1),
            pm25: (groupedData[date].pm25 / groupedData[date].count).toFixed(1),
            pm10: (groupedData[date].pm10 / groupedData[date].count).toFixed(1),
            no2: (groupedData[date].no2 / groupedData[date].count).toFixed(1),
            co: (groupedData[date].co / groupedData[date].count).toFixed(1),
        }));

        // Rentang tanggal
        const startDate = formattedData[formattedData.length - 1].date;
        const endDate = formattedData[0].date;

        // Buat PDF
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        res.setHeader("Content-Disposition", `attachment; filename=${city}_air_quality.pdf`);
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        // Header Dokumen
        doc.fontSize(20).text(`Laporan Kualitas Udara - ${city}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Rentang Data: ${startDate} - ${endDate}`, { align: "center" });
        doc.moveDown(2);

        // Buat Tabel
        const columnWidths = [100, 70, 70, 70, 70, 70];
        const startX = 50;
        let startY = doc.y + 10;

        // Header Tabel
        doc.font("Helvetica-Bold").fontSize(10);
        doc.text("Tanggal", startX, startY, { width: columnWidths[0], align: "left" });
        doc.text("AQI", startX + columnWidths[0], startY, { width: columnWidths[1], align: "center" });
        doc.text("PM2.5", startX + columnWidths[0] + columnWidths[1], startY, { width: columnWidths[2], align: "center" });
        doc.text("PM10", startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY, { width: columnWidths[3], align: "center" });
        doc.text("NO2", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY, { width: columnWidths[4], align: "center" });
        doc.text("CO", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY, { width: columnWidths[5], align: "center" });
        doc.moveDown(0.5);
        doc.moveTo(startX, doc.y).lineTo(startX + columnWidths.reduce((a, b) => a + b, 0), doc.y).stroke();
        doc.moveDown(0.5);

        // Isi Data Tabel
        doc.font("Helvetica").fontSize(10);
        formattedData.forEach((record) => {
            startY = doc.y;

            doc.text(record.date, startX, startY, { width: columnWidths[0], align: "left" });
            doc.text(record.aqi !== "NaN" ? record.aqi : "-", startX + columnWidths[0], startY, { width: columnWidths[1], align: "center" });
            doc.text(record.pm25 !== "NaN" ? record.pm25 : "-", startX + columnWidths[0] + columnWidths[1], startY, { width: columnWidths[2], align: "center" });
            doc.text(record.pm10 !== "NaN" ? record.pm10 : "-", startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY, { width: columnWidths[3], align: "center" });
            doc.text(record.no2 !== "NaN" ? record.no2 : "-", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY, { width: columnWidths[4], align: "center" });
            doc.text(record.co !== "NaN" ? record.co : "-", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], startY, { width: columnWidths[5], align: "center" });

            doc.moveDown(0.5);
            if (doc.y > 720) {
                doc.addPage();
                startY = doc.y;
            }
        });

        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ message: "Error exporting PDF", error });
    }
};

const exportToCSV = async (req, res) => {
    try {
        const { city } = req.params;
        const data = await AQIModel.getAllAQIData(city);

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan untuk kota ini." });
        }

        // Kelompokkan data berdasarkan tanggal
        const groupedData = {};
        data.forEach((record) => {
            const date = new Date(record.recorded_at).toISOString().split("T")[0];
            if (!groupedData[date]) {
                groupedData[date] = { count: 0, aqi: 0, pm25: 0, pm10: 0, no2: 0, co: 0 };
            }
            groupedData[date].count += 1;
            groupedData[date].aqi += record.aqi || 0;
            groupedData[date].pm25 += record.pm25 || 0;
            groupedData[date].pm10 += record.pm10 || 0;
            groupedData[date].no2 += record.no2 || 0;
            groupedData[date].co += record.co || 0;
        });

        // Ambil rata-rata per hari
        const formattedData = Object.keys(groupedData).map((date) => ({
            date,
            aqi: (groupedData[date].aqi / groupedData[date].count).toFixed(1),
            pm25: (groupedData[date].pm25 / groupedData[date].count).toFixed(1),
            pm10: (groupedData[date].pm10 / groupedData[date].count).toFixed(1),
            no2: (groupedData[date].no2 / groupedData[date].count).toFixed(1),
            co: (groupedData[date].co / groupedData[date].count).toFixed(1),
        }));

        const json2csvParser = new Parser({ fields: ["date", "aqi", "pm25", "pm10", "no2", "co"] });
        const csv = json2csvParser.parse(formattedData);

        res.setHeader("Content-Disposition", `attachment; filename=${city}_air_quality.csv`);
        res.setHeader("Content-Type", "text/csv");
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: "Error exporting CSV", error });
    }
};

module.exports = { exportToPDF, exportToCSV };