import { useState, useEffect } from "react";
import { AlertTriangle, Cloudy } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "./WeatherMap.css";

export default function WeatherMap({ selectedCity, weatherData, aqiData, loading, error }) {
  const [showAQIPopup, setShowAQIPopup] = useState(false);
  const [allCitiesAQI, setAllCitiesAQI] = useState([]);

  useEffect(() => {
    const fetchAQICities = async () => {
      try {
        const response = await fetch(
          `https://api.waqi.info/search/?keyword=Indonesia&token=b11a699ed8911f1bb04c81c013bb2b4cd381113b`
        );
        const data = await response.json();

        if (data.status === "ok") {
          const filteredCities = data.data
            .filter((city) => city.aqi !== "-")
            .map((city) => ({
              name: city.station.name,
              lat: city.station.geo[0],
              lon: city.station.geo[1],
              aqi: parseInt(city.aqi),
            }));
          setAllCitiesAQI(filteredCities);
        }
      } catch (error) {
        console.error("Error fetching AQI cities:", error);
      }
    };

    fetchAQICities();
  }, []);

  if (loading) {
    return <p className="loading-text">Memuat data...</p>;
  }

  if (error || !weatherData || !aqiData) {
    return <p className="error-text">Data tidak tersedia untuk {selectedCity}</p>;
  }

  const cityCoordinates = weatherData?.coord || { lat: -6.2088, lon: 106.8456 }; // Default: Jakarta

  // Notifikasi peringatan berdasarkan AQI dan suhu
  let warningMessage = "";
  if (aqiData.aqi >= 150) {
    warningMessage = "Udara tidak sehat! Gunakan masker saat keluar rumah.";
  } else if (aqiData.aqi >= 100) {
    warningMessage = "Udara kurang sehat untuk kelompok sensitif.";
  } else if (weatherData.temperature >= 35) {
    warningMessage = "Suhu tinggi! Tetap terhidrasi dan hindari sinar matahari langsung.";
  }

  // Function untuk menentukan warna berdasarkan AQI
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "green"; // Baik ✅
    if (aqi <= 100) return "yellow"; // Sedang ⚠️
    if (aqi <= 150) return "orange"; // Tidak sehat bagi kelompok sensitif ❗
    if (aqi <= 200) return "red"; // Tidak sehat ❌
    if (aqi <= 300) return "purple"; // Sangat tidak sehat 🚨
    return "brown"; // Berbahaya ☠️
  };

  return (
    <div className="weather-section">
      <div className="weather-info">
        <div className="weather-card">
          <p className="location">{selectedCity}</p>
          <div className="weather-content">
            <div className="temperature-section">
              <Cloudy />
              <div>
                <p className="temperature">{weatherData.temperature}°C</p>
                <p className="condition">Suhu saat ini</p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="aqi-section">
              <p className="aqi-value">
                {aqiData.aqi} <span className="aqi-label">AQI</span>
              </p>
              <span className="info-icon" onClick={() => setShowAQIPopup(true)}>?</span>
            </div>
          </div>
        </div>

        {warningMessage ? (
          <div className="warning-banner">
            <AlertTriangle className="warning-icon" />
            <p>{warningMessage}</p>
          </div>
        ) : (
          <div className="warning-banner">
            <p>Tidak ada peringatan saat ini.</p>
          </div>
        )}
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
        <MapContainer center={[cityCoordinates.lat, cityCoordinates.lon]} zoom={5} className="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker untuk kota yang dipilih */}
          <CircleMarker
            center={[cityCoordinates.lat, cityCoordinates.lon]}
            radius={15}
            color="blue"
            fillColor="blue"
            fillOpacity={0.4}
          >
            <Popup>
              {selectedCity} <br /> AQI: {aqiData.aqi} <br /> {weatherData.temperature}°C
            </Popup>
          </CircleMarker>

          {/* Marker untuk semua kota dari WAQI API */}
          {allCitiesAQI.map((city, index) => (
            <CircleMarker
              key={index}
              center={[city.lat, city.lon]}
              radius={10}
              color={getAQIColor(city.aqi)}
              fillColor={getAQIColor(city.aqi)}
              fillOpacity={0.5}
            >
              <Popup>
                {city.name} <br /> AQI: {city.aqi}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}