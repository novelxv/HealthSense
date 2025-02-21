import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar({ isNavbar, content, setSelectedCity }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);
    
    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        
        if (value.length > 0) {
            try {
                const response = await fetch(`https://healthsense-production.up.railway.app/api/health/current/${value}`);
                if (response.ok) {
                    setSuggestions([value]);
                } else {
                    setSuggestions(["Kota tidak ditemukan"]);
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
                setSuggestions(["Kota tidak ditemukan"]);
            }
        } else {
            setSuggestions([]);
        }
    };
    
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
        <div className={isNavbar ? "search-container" : "search-container-1"} ref={searchRef}>
        <input
        type="text"
        placeholder={content}
        className={isNavbar ? "search-input" : "search-input-1"}
        value={query}
        onChange={handleSearchChange}
        />
        <button className={isNavbar ? "search-button" : "search-button-1"}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={isNavbar ? "search-icon" : "search-icon-1"}
        >
        <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
        </svg>
        </button>
        {suggestions.length > 0 && (
            <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
                <li
                key={index}
                onClick={() => {
                    if (suggestion !== "Kota tidak ditemukan") {
                        setQuery(suggestion);
                        setSelectedCity(suggestion);
                    }
                    setSuggestions([]);
                }}
                >
                {suggestion}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}