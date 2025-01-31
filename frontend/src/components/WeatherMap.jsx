import { AlertTriangle } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "./WeatherMap.css";

const dummyData = {
  Jakarta: { lat: -6.2088, lng: 106.8456, temp: 30, aqi: 80, condition: "Berawan" },
  Bandung: { lat: -6.9175, lng: 107.6191, temp: 24, aqi: 50, condition: "Cerah" },
  Surabaya: { lat: -7.2504, lng: 112.7688, temp: 32, aqi: 100, condition: "Asap" },
  Medan: { lat: 3.5952, lng: 98.6722, temp: 28, aqi: 70, condition: "Hujan" },
};

export default function WeatherMap({ selectedCity }) {
  const cityData = dummyData[selectedCity] || dummyData["Jakarta"];

  return (
    <div className="weather-section">
      <div className="weather-info">
        <div className="weather-card">
          <div className="weather-details">
            <div className="location-info">
              <p className="location">{selectedCity}</p>
              <p className="temperature">{cityData.temp}°C</p>
              <p className="condition">{cityData.condition}</p>
            </div>
            <div className="aqi-info">
              <p className="aqi-value">{cityData.aqi}</p>
              <p className="aqi-label">AQI</p>
            </div>
          </div>
        </div>

        <div className="warning-banner">
          <AlertTriangle className="warning-icon" />
          <p>Perhatikan kualitas udara di sekitarmu! Pastikan tetap aman dan sehat.</p>
        </div>
      </div>

      {/* <div className="map-container">
        <MapContainer center={[cityData.lat, cityData.lng]} zoom={10} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CircleMarker center={[cityData.lat, cityData.lng]} radius={15} color="red" fillColor="red" fillOpacity={0.4}>
            <Popup>
              {selectedCity} <br /> AQI: {cityData.aqi} <br /> {cityData.temp}°C
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div> */}
      <div className="map-container">
        <img
          src="/heatmap.jpg"
          alt="Heatmap Kualitas Udara"
          className="heatmap-image"
        />
      </div>
    </div>
  );
}