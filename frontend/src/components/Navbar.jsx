import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Artikel", path: "/articles" },
    { name: "Tentang Kami", path: "/about" },
  ];

  const allLocations = ["Jakarta", "Surabaya", "Bandung", "Jember", "Malang", "Yogyakarta"];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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
      <SearchBar isNavbar={true} content="Cari Lokasi" allLocations={allLocations} />
    </nav>
  );
};

export default Navbar;
