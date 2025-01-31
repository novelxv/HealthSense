import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/AboutPage.css"
import TeamCard from "../components/TeamCard.jsx"
const AboutPage = () => {
    const teamMembers = [
        {
            name: "Novelya Putri R",
            role: "Developer",
            photoPath: "/path/to/novel-photo.jpg",
            github: "https://github.com/novelxv",
            email: "13522096@std.stei.itb.ac.id",
            instagram: "https://instagram.com/novelyaputrir",
        },
        {
            name: "Thea Josephine H",
            role: "Developer",
            photoPath: "../../public/aboutus/team/thea.jpeg",
            github: "https://github.com/pandaandsushi",
            email: "13522012@std.stei.itb.ac.id",
            instagram: "https://instagram.com/tjh9804",
        },
        {
            name: "Raffael Boymian S",
            role: "Developer",
            photoPath: "/path/to/raffael-photo.jpg",
            github: "https://github.com/slntkllr01",
            email: "13522046@std.stei.itb.ac.id",
            instagram: "https://instagram.com/faelzard",
        },
    ]

    return (
        <div className="about-container">
        {/* Hero Section */}
        <section className="aboutus-hero-section">
            <h1>
            HealthSense hadir untuk memberikan informasi lingkungan yang akurat dan relevan, membantu Anda memahami
            dampaknya terhadap kesehatan.
            </h1>

            <div className="aboutus-image-grid">
            <img src="../../public/aboutus/im1.png" alt="Environmental care" />
            <img src="../../public/aboutus/im2.png" alt="Healthcare" />
            <img src="../../public/aboutus/im3.png" alt="Nature" />
            <img src="../../public/aboutus/im4.png" alt="Wellness" />
            </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="vision-mission">
            <h2>Visi & Misi</h2>
            <div className="vision-mission-content">
                <div className="vision">
                <h3>Visi</h3>
                <p>
                    Menciptakan lingkungan yang lebih sehat dengan memberikan informasi berbasis data yang mudah diakses oleh
                    semua orang
                </p>
                </div>

                <div className="mission">
                <h3>Misi</h3>
                <ul>
                    <li>Mengintegrasikan data lingkungan dan kesehatan dalam satu platform.</li>
                    <li>Memberikan informasi real-time tentang kualitas udara dan kondisi lingkungan.</li>
                    <li>
                    Memberikan edukasi dan prediksi berbasis data untuk membantu masyarakat mengambil tindakan pencegahan.
                    </li>
                </ul>
                </div>
            </div>
        </section>

        {/* How We Work Section */}
        <section className="how-we-work">
            <div className="work-content">
                <h2>Siapa Kami</h2>
                <p>
                HealthSense adalah aplikasi website berbasis remote sensing untuk memantau kesehatan lingkungan, memberikan edukasi, dan peringatan dini. Aplikasi ini mengintegrasikan data geospasial, prakiraan cuaca, dan algoritma analitik untuk memprediksi risiko kesehatan.
                </p>
            </div>
            <div className="work-image">
                <img src="../../public/aboutus/im5.png" alt="Child with plant" />
            </div>
        </section>
        <section className="how-we-work">
            <div className="work-image">
                <img src="../../public/aboutus/im7.png" alt="Girl take a deep breath" />
            </div>
            <div className="work-content">
                <h2>Bagaimana Kami Bekerja</h2>
                <p>
                    HealthSense mengumpulkan dan menganalisis data dari berbagai sumber terpercaya, termasuk satelit Sentinel-5P
                    dan OpenAQ.
                </p>
                <p>
                    Dengan algoritma prediktif, kami menyediakan informasi real-time dan tren jangka panjang untuk membantu Anda
                    memahami kondisi lingkungan dengan lebih baik.
                </p>
            </div>
        </section>

        {/* Team Section */}
        <section className="the-team">
            <div className="features-title-wrapper">
                <h2 className="features-title">
                    <span className="highlight">Developers</span>
                </h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                    <TeamCard key={index} {...member} />
                    ))}
                </div>
            </div>
        </section>
        </div>
    )
}

export default AboutPage

