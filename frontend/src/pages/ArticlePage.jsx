import "../styles/ArticlePage.css";
import { useState, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const ArticlePage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  const articles = [
    {
      id: 1,
      title: "Liburan di Alam Kota Jakarta yang Bersih!",
      image: "../../AirTerjun.png",
      source: "Jakarta Barat",
      category: "Travel",
      isLarge: true,
    },
    {
      id: 2,
      title: "Intip 10 Kota Terbersih di Dunia, Keren Banget!",
      image: "../../AirTerjun2.png",
      source: "HariiniDidunia.com",
      category: "Highlight",
      isLarge: false,
    },
    {
      id: 3,
      title: "Tips Menjaga Kebersihan di Perkotaan",
      image: "../../AirTerjun3.jpg",
      source: "Kebersihan.id",
      category: "Lifestyle",
      isLarge: false,
    },
    {
      id: 4,
      title: "10 Tempat Wisata Ramah Lingkungan di Indonesia",
      image: "../../AirTerjun4.jpg",
      source: "EcoTraveler",
      category: "Eco-Tourism",
      isLarge: false,
    },
    {
      id: 5,
      title: "Kota Jakarta dan Upayanya Meningkatkan Kualitas Udara",
      image: "../../AirTerjun5.jpg",
      source: "GreenJakarta",
      category: "Environment",
      isLarge: false,
    },
    {
      id: 6,
      title: "Intip 10 Kota Terbersih di Dunia, Keren Banget!",
      image: "../../AirTerjun6.jpg",
      source: "HariiniDidunia.com",
      category: "Highlight",
      isLarge: true,
    },
    {
      id: 7,
      title: "Panduan Liburan Hemat di Kota Jakarta",
      image: "../../AirTerjun7.jpg",
      source: "Jakarta Wisata",
      category: "Travel",
      isLarge: false,
    },
    {
      id: 8,
      title: "5 Kebiasaan Sehari-hari untuk Mengurangi Polusi",
      image: "../../AirTerjun8.jpg",
      source: "Lingkungan Sehat",
      category: "Tips",
      isLarge: false,
    },
    {
      id: 9,
      title: "Bagaimana Masyarakat Berkontribusi dalam Kebersihan Kota",
      image: "../../AirTerjun9.jpg",
      source: "Komunitas Hijau",
      category: "Community",
      isLarge: false,
    },
    {
      id: 10,
      title: "Tips Liburan Hijau untuk Generasi Z",
      image: "../../AirTerjun10.jpg",
      source: "EcoGeneration",
      category: "Lifestyle",
      isLarge: false,
    },
  ];

  const renderArticleGroup = (groupArticles, isEven) => (
    <div className="article-group">
      {groupArticles.map((article, index) => (
        <Link
          key={article.id}
          to={`/articles/${article.id}`}  // ✅ Make the whole card clickable and navigate to the article details page
          className={`article-card ${article.isLarge ? "large" : ""}`}
          style={{
            gridColumn: isEven && index === 0 ? "2 / span 2" : "auto",
            gridRow: article.isLarge ? "span 2" : "auto",
          }}
        >
          <img
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            className="article-image"
          />
          <div className="article-content">
            <h3 className="article-title">{article.title}</h3>
            <div className="article-meta">
              <div className="source">
                <span>🌐</span>
                <span>{article.source}</span>
              </div>
              <span className="category">{article.category}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );

  const articleGroups = []
  for (let i = 0; i < articles.length; i += 5) {
    articleGroups.push(articles.slice(i, i + 5))
  }

  return (
    <div>
      <div className="main-content">
      <main className="main">

        
        <div className="search-container-1" ref={searchRef}>
          <SearchBar isNavbar={false} content="Jelajahi artikel" allLocations={[]}/>
        </div>
        <div className="article-container">
          {articleGroups.map((group, index) => renderArticleGroup(group, index % 2 !== 0))}
        </div>
    </main>
        </div>
    </div>
  )
}

export default ArticlePage