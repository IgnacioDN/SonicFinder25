import React, { useState, useEffect } from "react";
import { searchSpotify } from "../services/spotifyService";
import ArtistasSlider from "../components/ArtistasSlider";
import "../components/styles/ArtistPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'; 
import Footer from "../components/Footer";

const Artistas = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("artist");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Aseguramos que el scroll inicie en la parte superior al cargar la página
    window.scrollTo(0, 0);
  }, []);

  const handleImageError = (index) => {
    setSearchResults((prevResults) =>
      prevResults.map((item, i) => 
        i === index ? { ...item, image: "/default-image.jpg" } : item
      )
    );
  };

  const fetchData = async () => {
    if (!query.trim()) return;

    setIsSearching(true);

    try {
      const results = await searchSpotify(query, searchType);
      console.log("Resultados obtenidos:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error buscando en Spotify:", error);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [query, searchType]);

  return (
    <div className="artistas-container">
      <ArtistasSlider />
      <div className="artistas-content">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder={`Busca ${searchType === "artist" ? "artistas" : "canciones"}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={fetchData} disabled={isSearching}>
            {isSearching ? "Buscando..." : "Buscar"}
          </button>
        </div>
        <div className="search-filters">
          <div className="filter-option">
            <button
              onClick={() => setSearchType("artist")}
              className={searchType === "artist" ? "active" : ""}
            >
              <span className="filter-text">Artistas</span>
            </button>
          </div>
          <div className="filter-option">
            <button
              onClick={() => setSearchType("track")}
              className={searchType === "track" ? "active" : ""}
            >
              <span className="filter-text">Canciones</span>
            </button>
          </div>
        </div>

        {query && !isSearching && (
          <p className="search-results-info">Resultados con: {query}</p>
        )}

        <div className="artistas-grid">
          {isSearching && <p>Cargando resultados...</p>}
          {!isSearching && searchResults.length > 0 && (
            searchResults.map((item, index) => (
              <div key={item.id || index} className="artista-card">
                <img 
                  src={item.image || '/default-image.jpg'} 
                  alt={item.name} 
                  onError={() => handleImageError(index)}  
                />
                <h4>{item.name}</h4>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
                  {searchType === 'artist' ? 'Escuchar en Spotify' : 'Ver en Spotify'}
                </a>
              </div>
            ))
          )}
          {!isSearching && query && searchResults.length === 0 && (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Artistas;
