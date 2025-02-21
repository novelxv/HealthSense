import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./AirQualityChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function AirQualityChart({ selectedCity }) {
  const [viewMode, setViewMode] = useState("yearly");
  const [aqiData, setAqiData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAQIData = async () => {
      setLoading(true);
      setError("");

      let endpoint = "";
      switch (viewMode) {
        case "weekly":
          endpoint = `https://healthsense-production.up.railway.app/api/health/weekly/${selectedCity}`;
          break;
        case "monthly":
          endpoint = `https://healthsense-production.up.railway.app/api/health/monthly/${selectedCity}`;
          break;
        case "yearly":
          endpoint = `https://healthsense-production.up.railway.app/api/health/yearly/${selectedCity}`;
          break;
        default:
          setLoading(false);
          return;
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data AQI");
        }

        // Hapus duplikasi berdasarkan tanggal
        const uniqueData = [];
        const uniqueLabels = new Set();

        data.forEach((entry) => {
          const label = entry.week || entry.month || entry.day; // Sesuaikan field tanggal
          if (!uniqueLabels.has(label)) {
            uniqueLabels.add(label);
            uniqueData.push({ label, avg_aqi: entry.avg_aqi });
          }
        });

        // Simpan hasil yang telah dibersihkan
        setAqiData(uniqueData.map((d) => d.avg_aqi));
        setLabels(Array.from(uniqueLabels));
      } catch (err) {
        setError(err.message);
        setAqiData([]);
        setLabels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAQIData();
  }, [selectedCity, viewMode]);

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: `AQI ${selectedCity}`,
          data: aqiData,
          borderColor: "#4A3AFF",
          backgroundColor: "rgba(74, 58, 255, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: aqiData.length ? 4 : 0, // Sembunyikan titik jika tidak ada data
          pointBackgroundColor: "#4A3AFF",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    };
  }, [aqiData, labels]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: { color: "#6B7280" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context) => `AQI ${context[0].raw}`,
          label: (context) => `Tanggal: ${context.label}`,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-title">
          <span className="chart-label">Indeks Kualitas Udara</span>
          <h3 className="chart-heading">Tren AQI {selectedCity}</h3>
        </div>
        <div className="chart-filters">
          <button
            className={`filter-button ${viewMode === "weekly" ? "active" : ""}`}
            onClick={() => setViewMode("weekly")}
          >
            Mingguan
          </button>
          <button
            className={`filter-button ${viewMode === "monthly" ? "active" : ""}`}
            onClick={() => setViewMode("monthly")}
          >
            Bulanan
          </button>
          <button
            className={`filter-button ${viewMode === "yearly" ? "active" : ""}`}
            onClick={() => setViewMode("yearly")}
          >
            Tahunan
          </button>
        </div>
      </div>
      <div className="chart-wrapper">
        {loading ? (
          <p className="loading-text">Memuat data...</p>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : (
          <Line options={options} data={chartData} />
        )}
      </div>
    </div>
  );
}