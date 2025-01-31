import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Artikel", path: "/articles" },
    { name: "Tentang Kami", path: "/about" },
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="../../public/logo-healthsense.png"
          alt="HealthSense Logo"
        />
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

      <div className="search-container">
        <input type="text" placeholder="Cari Lokasi" className="search-input" />
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
      </div>
    </nav>
  );
};

export default Navbar;
