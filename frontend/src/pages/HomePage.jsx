import React from 'react';
import { Button } from '../components/Button';
import "../styles/HomePage.css";
import Navbar from '../components/Navbar';

const FeatureCard = ({ icon, title, description, buttonText }) => (
  <div className="feature-card">
    <img src={icon} alt={title} className="feature-icon" />
    <div className="feature-content">
      <h3>{title}</h3>
      <div className="feature-line"></div>
      <p>{description}</p>
      <button className="feature-button">
        {buttonText} →
      </button>
    </div>
  </div>
);

const HomePage = () => {
  const features = [
    {
      icon: "../assets/Bulb.png",
      title: "Informasi Tepat, Hidup Sehat",
      description: "Jelajahi artikel yang membahas polusi udara, perubahan iklim, dan tips menjaga kesehatan berdasarkan kondisi lingkungan terkini",
      buttonText: "Baca artikel"
    },
    {
      icon: "../assets/Shield.png",
      title: "Cegah Lebih Awal, Lindungi Diri",
      description: "Dengan analisis data lingkungan dan tren cuaca, ketahui kapan udara buruk dapat meningkatkan risiko gangguan pernapasan.",
      buttonText: "Cek sekarang"
    },
    {
      icon: "../assets/Warning.png",
      title: "Cegah Lebih Awal, Lindungi Diri",
      description: "Dengan analisis data lingkungan dan tren cuaca, ketahui kapan udara buruk dapat meningkatkan risiko gangguan pernapasan.",
      buttonText: "Cek sekarang"
    },
    {
      icon: "../assets/Magnifying.png",
      title: "Pantau Tren, Ambil Keputusan Lebih Baik",
      description: "Jelajahi data kualitas udara dan cuaca dalam bentuk grafik interaktif untuk memahami bagaimana perubahan lingkungan memengaruhi kesehatan Anda",
      buttonText: "Cek sekarang"
    }
  ];

  return (
    <div className="homepage">
        {/* Hero Section */}
        <section className="hero-section">
        <div className="hero-content">
            <div className="hero-titles">
            {['Lingkungan bersih', 'Hidup sehat', 'Masa depan cerah'].map((text, index) => {
                const words = text.split(' ');
                const boldWords = words.slice(0, -1);
                const lastWord = words[words.length - 1];
                
                return (
                <div key={index} className="hero-title-wrapper">
                    <h1 className="hero-title">
                    <span className="highlight">
                        {boldWords.map((word, idx) => (
                        <span key={idx} className="bold-text">{word} </span>
                        ))}
                        <span className="normal-text">{lastWord}</span>
                    </span>
                    </h1>
                </div>
                );
            })}
            </div>
            <button className="hero-cta">
            Cek lingkunganmu
            <span className="arrow-icon">→</span>
            </button>
        </div>
        </section>


      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Jangan Tertinggal Informasi!</h2>
          <p>Langganan notifikasi untuk mendapatkan informasi terbaru. Gratis tanpa dipungut biaya!</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Masukkan email" />
            <button className="newsletter-button">→</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-title-wrapper">
          <h2 className="features-title">
            <span className="highlight">Fitur kami</span>
          </h2>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
