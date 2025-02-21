import "./MetricsGrid.css";

export default function MetricsGrid({ aqiData, loading, error }) {
  if (loading) return <p className="loading-text">Memuat data...</p>;
  if (error) return <p className="error-text">Data tidak tersedia.</p>;

  const metrics = [
    { title: "Kadar PM2.5", value: aqiData?.pm25 ?? "-", unit: "µg/m³" },
    { title: "Kadar PM10", value: aqiData?.pm10 ?? "-", unit: "µg/m³" },
    { title: "Kadar NO2", value: aqiData?.no2 ?? "-", unit: "PPB" },
    { title: "Kadar CO", value: aqiData?.co ?? "-", unit: "PPM" },
  ];

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
              <span className="unit">{metric.value !== "-" ? metric.unit : ""}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}