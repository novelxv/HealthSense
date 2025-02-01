import { useState } from "react";
import { AlertTriangle, Cloudy } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "./WeatherMap.css";

const dummyData = {
  Jakarta: { lat: -6.2088, lng: 106.8456, temp: 30, aqi: 80, condition: "Berawan" },
  Bandung: { lat: -6.9175, lng: 107.6191, temp: 24, aqi: 50, condition: "Cerah" },
  Surabaya: { lat: -7.2504, lng: 112.7688, temp: 32, aqi: 100, condition: "Asap" },
  Medan: { lat: 3.5952, lng: 98.6722, temp: 28, aqi: 70, condition: "Hujan" },
};

export default function WeatherMap({ selectedCity }) {
  const [showAQIPopup, setShowAQIPopup] = useState(false);
  const cityData = dummyData[selectedCity] || dummyData["Jakarta"];

  return (
    <div className="weather-section">
      <div className="weather-info">
        <div className="weather-card">
          <p className="location">{selectedCity}, Jawa Barat</p>
          <div className="weather-content">
            <div className="temperature-section">
              <Cloudy />
              <div>
                <p className="temperature">{cityData.temp}°C</p>
                <p className="condition">{cityData.condition}</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="aqi-section">
              <p className="aqi-value">
                {cityData.aqi} <span className="aqi-label">AQI</span>
              </p>
              <span className="info-icon" onClick={() => setShowAQIPopup(true)}>?</span>
            </div>
          </div>
        </div>

        <div className="warning-banner">
          <AlertTriangle className="warning-icon" />
          <p>Perhatikan kualitas udara di sekitarmu! Pastikan tetap aman dan sehat.</p>
        </div>
      </div>

      {showAQIPopup && (
        <div className="aqi-popup-overlay" onClick={() => setShowAQIPopup(false)}>
          <div className="aqi-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Apa itu AQI?</h3>
            <p>
              Air Quality Index (AQI) mengukur kualitas udara. Semakin tinggi nilai AQI, semakin
              berbahaya udara bagi kesehatan. 
            </p>
            <ul>
              <li><b>0-50:</b> Baik ✅</li>
              <li><b>51-100:</b> Sedang ⚠️</li>
              <li><b>101-150:</b> Tidak sehat bagi kelompok sensitif ❗</li>
              <li><b>151-200:</b> Tidak sehat ❌</li>
              <li><b>201-300:</b> Sangat tidak sehat 🚨</li>
              <li><b>301+:</b> Berbahaya ☠️</li>
            </ul>
            <button className="close-popup" onClick={() => setShowAQIPopup(false)}>Tutup</button>
          </div>
        </div>
      )}

      <div className="map-container">
        <img src="/heatmap.jpg" alt="Heatmap Kualitas Udara" className="heatmap-image" />
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
    </div>
  );
}


