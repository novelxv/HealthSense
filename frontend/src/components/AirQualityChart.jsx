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
} from "chart.js"
import "./AirQualityChart.css"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const labels = ["1 Oct", "3 Oct", "7 Oct", "10 Oct", "14 Oct", "20 Oct", "23 Oct", "27 Oct", "30 Oct"]

const data = {
  labels,
  datasets: [
    {
      label: "Mobile payment",
      data: [5, 15, 18, 10, 20, 15, 8, 18, 12],
      borderColor: "#4A3AFF",
      backgroundColor: "#4A3AFF",
    },
  ],
}

export default function AirQualityChart() {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-title">
          <span className="chart-label">Statistics</span>
          <h3 className="chart-heading">Tren Cuaca dan Udara</h3>
        </div>
        <div className="chart-filters">
          <button className="filter-button">Harian</button>
          <button className="filter-button">Mingguan</button>
          <button className="filter-button active">Bulanan</button>
          <button className="filter-button">Tahunan</button>
        </div>
      </div>
      <div className="chart-wrapper">
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

