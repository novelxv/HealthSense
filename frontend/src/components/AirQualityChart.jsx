import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./AirQualityChart.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cityAQIData = {
  Jakarta: [50, 60, 70, 80, 90, 100, 80, 70, 60],
  Bandung: [30, 40, 50, 45, 55, 50, 40, 35, 30],
  Surabaya: [80, 85, 90, 100, 110, 120, 110, 100, 90],
  Medan: [40, 50, 60, 65, 55, 60, 50, 45, 40],
};

const labels = ["1 Oct", "3 Oct", "7 Oct", "10 Oct", "14 Oct", "20 Oct", "23 Oct", "27 Oct", "30 Oct"];

export default function AirQualityChart({ selectedCity }) {
  const data = {
    labels,
    datasets: [
      {
        label: `AQI ${selectedCity}`,
        data: cityAQIData[selectedCity] || cityAQIData["Jakarta"],
        borderColor: "#4A3AFF",
        backgroundColor: "#4A3AFF",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line options={{ responsive: true }} data={data} />
    </div>
  );
}