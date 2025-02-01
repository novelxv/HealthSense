import "../styles/ArticlePage.css";
import { useState, useRef, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

const processArticles = (articles) => {
  const articleGroups = [];
  let i = 0;

  while (i < articles.length) {
    if ((articleGroups.length % 2) === 0) {
      // Even-indexed groups: 3 small articles
      const group = articles.slice(i, i + 3).map(article => ({
        ...article,
        isLarge: false,
      }));
      articleGroups.push(group);
      i += 3;
    } else {
      // Odd-indexed groups: 1 large + 1 small
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
  const [query, setQuery] = useState("");
  const articles = [
    {
      id: 1,
      title: "Liburan di Alam Kota Jakarta yang Bersih!",
      image: "../../AirTerjun.png",
      location: "Jakarta Barat",
      category: "Travel",
      content: "true",
    },
    {
      id: 2,
      title: "Intip 10 Kota Terbersih di Dunia, Keren Banget!",
      image: "../../AirTerjun2.png",
      location: "HariiniDidunia.com",
      category: "Highlight",
      content: "false",
    },
    {
      id: 3,
      title: "Tips Menjaga Kebersihan di Perkotaan",
      image: "../../AirTerjun3.jpg",
      location: "Kebersihan.id",
      category: "Lifestyle",
      content: "false",
    },
    {
      id: 4,
      title: "10 Tempat Wisata Ramah Lingkungan di Indonesia",
      image: "../../AirTerjun4.jpg",
      location: "EcoTraveler",
      category: "Eco-Tourism",
      content: "false",
    },
    {
      id: 5,
      title: "Kota Jakarta dan Upayanya Meningkatkan Kualitas Udara",
      image: "../../AirTerjun5.jpg",
      location: "GreenJakarta",
      category: "Environment",
      content: "false",
    },
    {
      id: 6,
      title: "Intip 10 Kota Terbersih di Dunia, Keren Banget!",
      image: "../../AirTerjun6.jpg",
      location: "HariiniDidunia.com",
      category: "Highlight",
      content: "true",
    },
    {
      id: 7,
      title: "Panduan Liburan Hemat di Kota Jakarta",
      image: "../../AirTerjun7.jpg",
      location: "Jakarta Wisata",
      category: "Travel",
      content: "false",
    },
    {
      id: 8,
      title: "5 Kebiasaan Sehari-hari untuk Mengurangi Polusi",
      image: "../../AirTerjun8.jpg",
      location: "Lingkungan Sehat",
      category: "Tips",
      content: "false",
    },
    {
      id: 9,
      title: "Bagaimana Masyarakat Berkontribusi dalam Kebersihan Kota",
      image: "../../AirTerjun9.jpg",
      location: "Komunitas Hijau",
      category: "Community",
      content: "false",
    },
    {
      id: 10,
      title: "Tips Liburan Hijau untuk Generasi Z",
      image: "../../AirTerjun10.jpg",
      location: "EcoGeneration",
      category: "Lifestyle",
      content: "false",
    },
  ];
  const searchRef = useRef(null);

  const articleGroups = processArticles(articles);

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
                          <span>{article.location}</span>
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