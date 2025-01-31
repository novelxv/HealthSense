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
      label: "Wire transfer",
      data: [1000, 2500, 2000, 2000, 3500, 2000, 1000, 2000, 3000],
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.5)",
    },
    {
      label: "Mobile payment",
      data: [500, 1500, 1800, 1000, 2000, 1500, 800, 1800, 1200],
      borderColor: "rgb(236, 72, 153)",
      backgroundColor: "rgba(236, 72, 153, 0.5)",
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

