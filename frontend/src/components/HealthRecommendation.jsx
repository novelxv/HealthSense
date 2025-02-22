import "./HealthRecommendation.css";

export default function HealthRecommendations({ weatherData, aqiData }) {
  if (!weatherData || !aqiData) {
    return (
      <div className="health-recommendations">
        <p className="loading-text">Data kesehatan tidak tersedia.</p>
      </div>
    );
  }

  const { temperature } = weatherData.temperature;
  const { aqi } = aqiData.aqi;

  // debug
  console.log("RECOM", temperature, aqi);

  let predictedDiseases = [];
  let healthRecommendations = [];

  // Prediksi Penyakit Berdasarkan AQI
  if (aqi >= 301) {
    predictedDiseases.push("Penyakit paru-paru kronis", "Serangan jantung", "Gangguan pernapasan akut");
    healthRecommendations.push(
      "Tetap di dalam ruangan dengan udara bersih",
      "Gunakan masker khusus N95 saat keluar rumah",
      "Gunakan alat pembersih udara dalam ruangan"
    );
  } else if (aqi >= 201) {
    predictedDiseases.push("Sesak napas", "Iritasi mata", "Peningkatan risiko asma");
    healthRecommendations.push(
      "Kurangi aktivitas di luar ruangan",
      "Gunakan masker jika harus keluar",
      "Tutup jendela dan pintu untuk mengurangi paparan"
    );
  } else if (aqi >= 151) {
    predictedDiseases.push("Batuk", "Iritasi tenggorokan", "Peningkatan risiko infeksi saluran pernapasan");
    healthRecommendations.push(
      "Gunakan masker saat di luar",
      "Hindari jalan raya dengan polusi tinggi",
      "Minum banyak air untuk menjaga hidrasi"
    );
  } else if (aqi >= 101) {
    predictedDiseases.push("Peningkatan risiko alergi", "Mata kering", "Hidung tersumbat");
    healthRecommendations.push(
      "Gunakan kacamata pelindung jika berada di luar",
      "Gunakan pelembap udara dalam ruangan",
      "Cuci wajah dan tangan setelah keluar rumah"
    );
  } else {
    predictedDiseases.push("Risiko kesehatan rendah", "Kondisi udara aman");
    healthRecommendations.push(
      "Nikmati aktivitas luar ruangan",
      "Tetap jaga kebersihan diri",
      "Lakukan olahraga ringan untuk meningkatkan imunitas"
    );
  }

  // Prediksi Penyakit Berdasarkan Suhu
  if (temperature <= 15) {
    predictedDiseases.push("Hipotermia", "Flu", "Radang sendi memburuk");
    healthRecommendations.push(
      "Gunakan pakaian tebal",
      "Minum minuman hangat",
      "Hindari angin dingin dan hujan"
    );
  } else if (temperature >= 35) {
    predictedDiseases.push("Heatstroke", "Dehidrasi", "Ruam panas");
    healthRecommendations.push(
      "Minum banyak air",
      "Gunakan pakaian ringan dan berwarna terang",
      "Hindari aktivitas berat di siang hari"
    );
  }

  return (
    <div className="health-recommendations">
      <div className="recommendations-section">
        <h2 className="dashboard-section-title">Potensi Penyakit</h2>
        <p className="dashboard-section-description">
          Kemungkinan penyakit yang dapat muncul berdasarkan kondisi lingkungan saat ini:
        </p>
        <ul className="recommendations-list">
          {predictedDiseases.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
      </div>

      <div className="recommendations-section">
        <h2 className="dashboard-section-title">Rekomendasi Kesehatan</h2>
        <p className="dashboard-section-description">Saran kesehatan berdasarkan potensi penyakit:</p>
        <ul className="recommendations-list">
          {healthRecommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}