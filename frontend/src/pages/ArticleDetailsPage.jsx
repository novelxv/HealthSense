import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/ArticleDetailsPage.css"
import { useRef } from 'react';
import { formatDistanceToNow } from 'date-fns';
import SearchBar from '../components/SearchBar';
const ArticleDetailsPage = () => {
    const searchRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const article = {
        id: 2,
        title: "Liburan di Alam Kota Jakarta yang Bersih!",
        location: "Jakarta",
        created_at: "2025-01-10T12:00:00Z",
        category: "Wisata Alam",
        content: "Jakarta dikenal sebagai kota metropolitan yang sibuk dengan kepadatan penduduk dan kemacetan lalu lintas. Namun, di balik kesibukan tersebut, Jakarta memiliki banyak tempat wisata yang menawarkan udara segar dan kegiatan yang menyehatkan. Berikut adalah 7 tempat wisata sehat di Jakarta yang bisa kamu kunjungi untuk berolahraga dan bersantai: ",
        image: "../../articledetails.png"
    };

    const relativeDate = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });

    return (
        <div>
            <main className="articledetails-main-content">
                <div className="articledetails-container">
                    <header className="articledetails-header">
                        <div className="header-left">
                            <button 
                                className="articledetails-back-button" 
                                onClick={() => navigate("/articles")}
                            >
                                ←
                            </button>
                            <div className="header-text">
                                <h1 className="articledetails-title">{article.title}</h1>
                                <div className="articledetails-meta">
                                    {article.location} - {relativeDate}
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <span className="category-tag">{article.category}</span>
                        </div>
                    </header>

                    <div className="article-image-container">
                        <img src={article.image || "/placeholder.svg"} alt={article.title} className="article-image" />
                    </div>

                    <div className="articledetails-content">
                        <p className="article-intro">
                            {article.content}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};


export default ArticleDetailsPage

