import React, { useState, useEffect } from "react";
import { searchSpotify } from "../services/spotifyService";
import ArtistasSlider from "../components/ArtistasSlider";
import "../components/styles/ArtistPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'; 
import Footer from "../components/Footer";

const Artistas = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("artist"); // 'artist' o 'track'
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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
      const results = await searchSpotify(query, searchType);  // Ahora se pasa el searchType a la función de búsqueda
      console.log("Resultados obtenidos:", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error buscando en Spotify:", error);
    }

    setIsSearching(false);
  };

  useEffect(() => {
    if (query) {
      fetchData();  // Llamada a la función para obtener los resultados cuando cambie el query
    }
  }, [query, searchType]); // Se vuelve a ejecutar cuando cambia el query o el tipo de búsqueda

  return (
    <div className="artistas-container">
      <ArtistasSlider />

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
            
          </button>
        </div>
        <div className="filter-option">
          <button
            onClick={() => setSearchType("track")} 
            className={searchType === "track" ? "active" : ""}
          >
            
          </button>
        </div>
      </div>

      {query && !isSearching && (
        <p className="search-results-info">Resultados con: {query}</p>
      )}

      <div className="artistas-grid">
        {isSearching ? (
          <p>Cargando resultados...</p>
        ) : (
          searchResults.length > 0 ? (
            searchResults.map((item, index) => (
              <div key={item.id || index} className="artista-card">
                <img 
                  src={item.image || '/default-image.jpg'} 
                  alt={item.name} 
                  onError={() => handleImageError(index)}  
                />
                <h4>{item.name}</h4>
                <p>{item.artist && `Por: ${item.artist}`}</p> {/* Mostrar el artista si es una canción */}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
                  {searchType === 'artist' ? 'Escuchar en Spotify' : 'Ver en Spotify'}
                </a>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Artistas;
