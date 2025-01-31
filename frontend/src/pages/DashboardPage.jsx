import WeatherMap from "../components/WeatherMap"
import AirQualityChart from "../components/AirQualityChart"
import MetricsGrid from "../components/MetricsGrid"
import HealthRecommendations from "../components/HealthRecommendation"
import NotificationSignup from "../components/NotificationSignup"
import SearchBar from "../components/SearchBar.jsx";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="app">
      <div className="bg-image">
      <main className="main">

        
        <section className="dashboard-section">
        <SearchBar isNavbar={false} content="Masukkan lokasi" allLocations={[]}/>
          <WeatherMap />
        </section>
        <NotificationSignup />
        <section className="trends-section">
          <div className="features-title-wrapper">
            <h2 className="features-title">
                <span className="highlight">Tren Cuaca dan Udara</span>
            </h2>
          </div>
          <div className="chart-card">
            <AirQualityChart />
          </div>
        </section>
        <MetricsGrid />
        <div className="download-container">
          <button className="download-button">
            <span>Download semua data  </span>
            <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
        <HealthRecommendations />
      </main>
        </div>
    </div>
  )
}

