import WeatherMap from "../components/WeatherMap";
import AirQualityChart from "../components/AirQualityChart";
import MetricsGrid from "../components/MetricsGrid";
import HealthRecommendations from "../components/HealthRecommendation";
import NotificationSignup from "../components/NotificationSignup";
import SearchBar from "../components/SearchBar.jsx";
import { useState } from "react";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Jakarta");

  const handleDownload = () => {
    setShowDownloadPopup(true);
    setTimeout(() => setShowDownloadPopup(false), 3000); // Auto close after 3 sec
  };

  return (
    <div className="app">
      <div className="bg-image">
        <main className="main">
          <section className="dashboard-section">
            <SearchBar
              isNavbar={false}
              content="Masukkan lokasi"
              allLocations={["Jakarta", "Bandung", "Surabaya", "Medan"]}
              setSelectedCity={setSelectedCity}
            />
            <WeatherMap selectedCity={selectedCity} />
          </section>

          <MetricsGrid selectedCity={selectedCity} />
          
          <NotificationSignup />

          <section className="trends-section">
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