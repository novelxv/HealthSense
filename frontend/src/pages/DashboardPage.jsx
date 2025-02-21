import WeatherMap from "../components/WeatherMap";
import AirQualityChart from "../components/AirQualityChart";
import MetricsGrid from "../components/MetricsGrid";
import HealthRecommendations from "../components/HealthRecommendation";
import NotificationSignup from "../components/NotificationSignup";
import SearchBar from "../components/SearchBar.jsx";
import { useState, useEffect } from "react";
import "../styles/DashboardPage.css";
import { useLocation } from "react-router-dom";

export default function DashboardPage() {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Jakarta");

  // State untuk menyimpan data cuaca & kualitas udara
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`https://healthsense-production.up.railway.app/api/health/current/${selectedCity}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data");
        }

        setWeatherData(data.weather);
        setAqiData(data.airQuality);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setAqiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]);

  const handleDownload = () => {
    setShowDownloadPopup(true);
    setTimeout(() => setShowDownloadPopup(false), 3000); // Auto close after 3 sec
  };

  return (
    <div className="app">
      <div className="bg-image">
        <main className="main">
          <section className="dashboard-section" id="metrics">
            <SearchBar isNavbar={false} content="Masukkan lokasi" setSelectedCity={setSelectedCity} />
            <WeatherMap selectedCity={selectedCity} weatherData={weatherData} aqiData={aqiData} loading={loading} error={error} />
          </section>

          <MetricsGrid aqiData={aqiData} loading={loading} error={error} />
          
          <section id="notifications">
            <NotificationSignup />
          </section>

          <section className="trends-section" id="trends">
            <div className="features-title-wrapper">
              <h2 className="features-title">
                <span className="highlight">Tren Cuaca dan Udara</span>
              </h2>
            </div>
            <div className="chart-card">
              <AirQualityChart selectedCity={selectedCity} />
            </div>
          </section>

          <div className="download-container">
            <button className="download-button" onClick={handleDownload}>
              <span>Download semua data</span>
              <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

          {showDownloadPopup && (
            <div className="popup-message">
              <p>✅ Data berhasil diunduh!</p>
            </div>
          )}

          <HealthRecommendations />
        </main>
      </div>
    </div>
  );
}