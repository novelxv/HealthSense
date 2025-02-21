import { useState, useEffect, useRef } from "react";
import "./SearchBarArticle.css";

const SearchBarArticle = ({ articles, setFilteredArticles }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredArticles(articles);
      setSuggestions([]);
      return;
    }

    // Filter artikel berdasarkan judul, lokasi, atau kategori
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(value.toLowerCase()) ||
        article.location?.toLowerCase().includes(value.toLowerCase()) ||
        article.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredArticles(filtered);
    setSuggestions(filtered.map((article) => article.title));
  };

  return (
    <div className="search-container-article" ref={searchRef}>
      <input
        type="text"
        placeholder="Cari artikel berdasarkan judul, lokasi, atau kategori..."
        className="search-input-article"
        value={query}
        onChange={handleSearchChange}
      />
      <button className="search-button-article">→</button>

      {suggestions.length > 0 && (
        <ul className="suggestions-list-article">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <li key={index} onClick={() => setQuery(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarArticle;