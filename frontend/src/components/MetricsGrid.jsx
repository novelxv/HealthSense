import { Line } from "react-chartjs-2"
import "./MetricsGrid.css"

const sparklineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
}

const sparklineData = {
  labels: Array.from({ length: 20 }, (_, i) => i),
  datasets: [
    {
      data: Array.from({ length: 20 }, () => Math.random() * 100 + 500),
      borderColor: "rgb(59, 130, 246)",
      borderWidth: 2,
      fill: false,
    },
  ],
}

export default function MetricsGrid() {
  const metrics = [
    { title: "Kadar CO2", value: "635", unit: "PPM", change: "+3.01%" },
    { title: "Kadar PM2.5", value: "635", unit: "PPM", change: "+3.01%" },
    { title: "Kadar Ozon", value: "635", unit: "PPM", change: "+3.01%" },
  ]

  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="metric-header">
            <span className="metric-label">Statistics</span>
            <h3 className="metric-title">{metric.title}</h3>
          </div>
          <div className="metric-content">
            <div className="metric-value">
              <span className="value">{metric.value}</span>
              <span className="unit">{metric.unit}</span>
            </div>
            <span className="metric-change">{metric.change}</span>
          </div>
          <div className="sparkline">
            <Line options={sparklineOptions} data={sparklineData} />
          </div>
        </div>
      ))}
    </div>
  )
}