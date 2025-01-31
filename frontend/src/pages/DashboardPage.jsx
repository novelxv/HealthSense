import { Search } from "lucide-react"
import WeatherMap from "../components/WeatherMap"
import AirQualityChart from "../components/AirQualityChart"
import MetricsGrid from "../components/MetricsGrid"
import HealthRecommendations from "../components/HealthRecommendation"
import NotificationSignup from "../components/NotificationSignup"
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="app">

      <main className="main">
        <WeatherMap />
        <NotificationSignup />
        <section className="trends-section">
          <h2 className="section-title">Tren Cuaca dan Udara</h2>
          <div className="chart-card">
            <AirQualityChart />
          </div>
        </section>
        <MetricsGrid />
        <div className="download-container">
          <button className="download-button">
            <span>Download semua data</span>
            <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
        <HealthRecommendations />
      </main>
    </div>
  )
}

