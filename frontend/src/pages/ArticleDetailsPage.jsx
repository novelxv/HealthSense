import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ArticleDetailsPage.css";
import { formatDistanceToNow } from "date-fns";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://healthsense-production.up.railway.app';

const ArticleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/education/${id}`);
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Artikel tidak ditemukan</p>;

  const relativeDate = formatDistanceToNow(new Date(article.created_at), { addSuffix: true });

  return (
    <div>
      <main className="articledetails-main-content">
        <div className="articledetails-container">
          <header className="articledetails-header">
            <div className="header-left">
              <button className="articledetails-back-button" onClick={() => navigate("/articles")}>←</button>
              <div className="header-text">
                <h1 className="articledetails-title">{article.title}</h1>
                <div className="articledetails-meta">{article.location} - {relativeDate}</div>
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
            <p className="article-intro">{article.content}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailsPage;