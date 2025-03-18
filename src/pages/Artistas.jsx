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

  const handleImageError = (index) => {
    const updatedResults = [...searchResults];
    updatedResults[index].image = '/default-image.jpg';  
    setSearchResults(updatedResults);  
  };

  const fetchData = async () => {
    if (!query) return; 
    setIsSearching(true); 

    const results = await searchSpotify(query, searchType); 

    setSearchResults(results); 

    setIsSearching(false); 
  };

  useEffect(() => {
    fetchData(); 
  }, [query, searchType]);

  return (
    <div className="artistas-container">
      {}
      <ArtistasSlider />
      
      {}
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

      {}
      <div className="search-filters">
        <div className="filter-option">
          <button
            onClick={() => setSearchType("artist")} 
            className={searchType === "artist" ? "active" : ""}
          >
            
          </button>
          <span>Artistas</span>
        </div>
        <div className="filter-option">
          <button
            onClick={() => setSearchType("track")} 
            className={searchType === "track" ? "active" : ""}
          >
          </button>
          <span>Canciones</span>
        </div>
      </div>

      {}
      {query && !isSearching && (
        <p className="search-results-info">Resultados con: {query}</p>
      )}

      <div className="artistas-grid">
        {isSearching ? (
          <p>Cargando resultados...</p> do
        ) : (
          searchResults.map((item, index) => (
            <div key={item.id} className="artista-card">
              {}
              <img 
                src={item.image || '/default-image.jpg'} 
                alt={searchType === "artist" ? item.name : item.name} 
                onError={() => handleImageError(index)}  
              />
              <h4>{item.name}</h4>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
                Escuchar en Spotify
              </a>
            </div>
          ))
        )}
      </div>
      <Footer /> 
    </div>
  );
};

export default Artistas;
