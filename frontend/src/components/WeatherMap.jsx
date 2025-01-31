"use client"

import { AlertTriangle } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "./WeatherMap.css"

export default function WeatherMap() {
  return (
    <div className="weather-section">
      <div className="weather-info">
        <div className="weather-card">
          <div className="weather-details">
            <div className="location-info">
              <p className="location">Semarang, Jawa Tengah</p>
              <p className="temperature">22°C</p>
              <p className="condition">Berawan</p>
            </div>
            <div className="aqi-info">
              <p className="aqi-value">38</p>
              <p className="aqi-label">AQI</p>
            </div>
          </div>
        </div>
        <div className="warning-banner">
          <AlertTriangle className="warning-icon" />
          <p>Tingkat polusi sangat tinggi nih, jangan lupa pakai masker kalau bepergian ya</p>
        </div>
      </div>

      <div className="map-container">
        <MapContainer center={[-7.0051453, 110.4381254]} zoom={9} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-7.0051453, 110.4381254]}>
            <Popup>
              22°C
              <br />
              38 AQI
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}