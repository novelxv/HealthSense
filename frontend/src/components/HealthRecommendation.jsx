import "./HealthRecommendation.css"

export default function HealthRecommendations() {
  return (
    <div className="health-recommendations">
      <div className="recommendations-section">
        <h2 className="dashboard-section-title">Potensi Penyakit</h2>
        <p className="dashboard-section-description">
          Kemungkinan penyakit yang dapat muncul berdasarkan kondisi lingkunganmu saat ini:
        </p>
        <ul className="recommendations-list">
          <li>Batuk</li>
          <li>Pilek</li>
          <li>Hipotermia</li>
          <li>Demam</li>
        </ul>
      </div>

      <div className="recommendations-section">
        <h2 className="dashboard-section-title">Rekomendasi Kesehatan</h2>
        <p className="dashboard-section-description">Saran kesehatan berdasarkan potensi penyakit:</p>
        <ul className="recommendations-list">
          <li>Gunakan jaket</li>
          <li>Makan makanan bergizi</li>
          <li>Minum minuman hangat</li>
        </ul>
      </div>
    </div>
  )
}

