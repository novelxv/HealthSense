import { useState, useMemo } from "react"
import { Line } from "react-chartjs-2"
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
} from "chart.js"
import "./AirQualityChart.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// Generate dummy AQI data
const generateYearlyData = () => {
  const months = 12
  const data = {}
  const cities = ["Jakarta", "Bandung", "Surabaya", "Medan"]

  cities.forEach((city) => {
    data[city] = Array.from({ length: months * 30 }, () => Math.floor(Math.random() * (100 - 40) + 40))
  })

  return data
}

const cityAQIData = generateYearlyData()

export default function AirQualityChart({ selectedCity }) {
  const [viewMode, setViewMode] = useState("yearly")
  const currentDate = new Date()

  const getDateRangeData = (mode) => {
    const data = cityAQIData[selectedCity]
    const today = new Date()

    switch (mode) {
      case "weekly":
        const dayOfWeek = today.getDay()
        const days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today)
          date.setDate(date.getDate() - dayOfWeek + i)
          return date.toLocaleDateString("id-ID", { weekday: "short" })
        })
        return {
          labels: days,
          data: data.slice(-7),
        }

      case "monthly":
        const weeksInMonth = Array.from({ length: 4 }, (_, i) => `Minggu ${i + 1}`)
        const weeklyData = Array.from(
          { length: 4 },
          (_, i) => data.slice(-28 + i * 7, -21 + i * 7).reduce((a, b) => a + b, 0) / 7,
        )
        return {
          labels: weeksInMonth,
          data: weeklyData,
        }

      case "yearly":
        const months = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(today.getFullYear(), i, 1)
          return date.toLocaleDateString("id-ID", { month: "short" }).toUpperCase()
        })
        const monthlyData = Array.from(
          { length: 12 },
          (_, i) => data.slice(i * 30, (i + 1) * 30).reduce((a, b) => a + b, 0) / 30,
        )
        return {
          labels: months,
          data: monthlyData,
        }

      default:
        return { labels: [], data: [] }
    }
  }

  const chartData = useMemo(() => {
    const { labels, data } = getDateRangeData(viewMode)

    return {
      labels,
      datasets: [
        {
          label: `AQI ${selectedCity}`,
          data: data,
          borderColor: "#4A3AFF",
          backgroundColor: "rgba(74, 58, 255, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#4A3AFF",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    }
  }, [selectedCity, viewMode, getDateRangeData])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#6B7280",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context) => {
            const value = context[0].raw
            return `AQI ${value}`
          },
          label: (context) => {
            const date = new Date()
            return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" })
          },
        },
      },
    },
  }

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
        <Line options={options} data={chartData} />
      </div>
    </div>
  )
}