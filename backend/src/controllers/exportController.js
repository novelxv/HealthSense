const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");
const AQIModel = require("../models/aqiModel");
const fs = require("fs");

const exportToPDF = async (req, res) => {
    try {
        const { city } = req.params;
        const data = await AQIModel.getAllAQIData(city);

        if (!data.length) {
            return res.status(404).json({ message: "Tidak ada data historis untuk kota ini" });
        }

        // Buat PDF
        const doc = new PDFDocument({ margin: 30, size: "A4" });
        res.setHeader("Content-Disposition", `attachment; filename=${city}_air_quality.pdf`);
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        // Header Dokumen
        doc.fontSize(20).text(`Laporan Kualitas Udara - ${city}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Rentang Data: ${data[data.length - 1].recorded_at.split("T")[0]} - ${data[0].recorded_at.split("T")[0]}`, { align: "center" });
        doc.moveDown(2);

        // Buat Tabel
        const columnWidths = [100, 80, 80, 80, 80]; // Lebar kolom
        const startX = 50;
        let startY = doc.y + 10; // Mulai di bawah judul

        // Header Tabel
        doc.font("Helvetica-Bold").fontSize(10);
        doc.text("Tanggal", startX, startY, { width: columnWidths[0], align: "left" });
        doc.text("PM2.5", startX + columnWidths[0], startY, { width: columnWidths[1], align: "center" });
        doc.text("PM10", startX + columnWidths[0] + columnWidths[1], startY, { width: columnWidths[2], align: "center" });
        doc.text("NO2", startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY, { width: columnWidths[3], align: "center" });
        doc.text("CO", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY, { width: columnWidths[4], align: "center" });
        doc.moveDown(0.5);
        doc.moveTo(startX, doc.y).lineTo(startX + columnWidths.reduce((a, b) => a + b, 0), doc.y).stroke();
        doc.moveDown(0.5);

        // Isi Data Tabel
        doc.font("Helvetica").fontSize(10);
        data.forEach((record) => {
            startY = doc.y;
            doc.text(record.recorded_at.split("T")[0], startX, startY, { width: columnWidths[0], align: "left" });
            doc.text(record.pm25 !== null ? record.pm25.toFixed(1) : "-", startX + columnWidths[0], startY, { width: columnWidths[1], align: "center" });
            doc.text(record.pm10 !== null ? record.pm10.toFixed(1) : "-", startX + columnWidths[0] + columnWidths[1], startY, { width: columnWidths[2], align: "center" });
            doc.text(record.no2 !== null ? record.no2.toFixed(1) : "-", startX + columnWidths[0] + columnWidths[1] + columnWidths[2], startY, { width: columnWidths[3], align: "center" });
            doc.text(record.co !== null ? record.co.toFixed(1) : "-", startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], startY, { width: columnWidths[4], align: "center" });

            doc.moveDown(0.5);
            if (doc.y > 720) { // Jika melebihi batas halaman, buat halaman baru
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