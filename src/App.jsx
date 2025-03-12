import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router, useLocation } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import BannerSlider from "./components/BannerSlider";
import SpotifyGrid from "./components/SpotifyGrid";
import Recomendados from "./components/Recomendados";
import Content from "./components/Content";
import { searchSpotify } from "./services/spotifyService";
import InformativeSection from "./components/InformativeSection";
import Artistas from "./pages/Artistas";
import banner1 from "./assets/banners/bannerconcertmedium.jpg";
import banner2 from "./assets/banners/pexels-chaitaastic-2093323.jpg";
import banner3 from "./assets/banners/pexels-jc-siller-30672065-8649332.jpg";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-in").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setQuery("");
    setSearchResults([]);
  }, [location.pathname]);

  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true);
    const results = await searchSpotify(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  useEffect(() => {
    const timer = setTimeout(handleSearch, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <BannerSlider banners={[banner1, banner2, banner3]} />

      {/* Sección del Buscador */}
      <div className="search-section fade-in">
        <h2 className="spotify-grid-title">
          {searchResults.length > 0 ? `Resultados para: ${query}` : "Explora nuevos artistas en Spotify"}
        </h2>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar artistas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch} disabled={isSearching}>
            Buscar
          </button>
        </div>
        <div className="artistas-grid">
          {isSearching ? (
            <p>Buscando...</p>
          ) : (
            searchResults.map((artist) => (
              <div key={artist.id} className="artista-card">
                <img src={artist.image} alt={artist.name} />
                <h4>{artist.name}</h4>
                <a href={artist.url} target="_blank" rel="noopener noreferrer">
                  Escuchar en Spotify
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sección Informativa */}
      <InformativeSection />

      {/* Sección Recomendados */}
      <Recomendados />

      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/artistas" element={<Artistas />} />
      </Routes>
    </div>
  );
};

export default App;
