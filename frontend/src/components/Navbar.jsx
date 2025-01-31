import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null); // Ref untuk search box

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Artikel", path: "/articles" },
    { name: "Tentang Kami", path: "/about" },
  ];

  const allLocations = ["Jakarta", "Surabaya", "Bandung", "Jember", "Malang", "Yogyakarta"];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filtered = allLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : ["Kota tidak ditemukan"]);
    } else {
      setSuggestions([]);
    }
  };

  // Fungsi untuk menutup suggestions saat klik di luar search box
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

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../../logo-healthsense.png" alt="HealthSense Logo" />
      </div>

      <button className="burger-menu" onClick={toggleMenu}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      <ul className={`navbar-menu ${isMenuOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <li key={item.name} className="menu-item">
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.name}
            </NavLink>
            <div className="menu-line"></div>
          </li>
        ))}
      </ul>

      {/* Search Box */}
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Cari Lokasi"
          className="search-input"
          value={query}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="search-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* Tampilkan rekomendasi */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  if (suggestion !== "Kota tidak ditemukan") setQuery(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
