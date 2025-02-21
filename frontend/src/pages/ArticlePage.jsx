import "../styles/ArticlePage.css";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://healthsense-production.up.railway.app';

const processArticles = (articles) => {
  const articleGroups = [];
  let i = 0;

  while (i < articles.length) {
    if ((articleGroups.length % 2) === 0) {
      const group = articles.slice(i, i + 3).map(article => ({
        ...article,
        isLarge: false,
      }));
      articleGroups.push(group);
      i += 3;
    } else {
      const group = articles.slice(i, i + 2).map((article, index) => ({
        ...article,
        isLarge: index === 0,
      }));
      articleGroups.push(group);
      i += 2;
    }
  }

  return articleGroups;
};

const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/education`);
        const data = await response.json();
        setArticles(data);
        setFilteredArticles(data); // Default tampilkan semua artikel
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredArticles(articles); // Reset jika kosong
      return;
    }

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const articleGroups = processArticles(filteredArticles);

  return (
    <div>
      <div className="main-content">
        <main className="main">
          <div className="search-container-1" ref={searchRef}>
            <SearchBar isNavbar={false} content="Jelajahi artikel" allLocations={[]} />
          </div>
          <div className="article-container">
            {articleGroups.map((group, index) => (
              <div className="article-group" key={index}>
                {group.map((article, idx) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className={`article-card ${article.isLarge ? "large" : ""}`}
                    style={{
                      gridColumn: article.isLarge ? "span 2" : "auto",
                      gridRow: article.isLarge ? "span 2" : "auto",
                    }}
                  >
                    <img src={article.image || "/placeholder.svg"} alt={article.title} className="article-image" />
                    <div className="article-content">
                      <h3 className="article-title">{article.title}</h3>
                      <div className="article-meta">
                        <div className="location">
                          <span>🌐</span>
                          <span>{article.location || "Tidak diketahui"}</span>
                        </div>
                        <span className="category">{article.category}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArticlePage;