import React, { useState, useEffect } from "react";
import { searchSpotify } from "../services/spotifyService";

const Artistas = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query) {
        setIsSearching(true);
        const results = await searchSpotify(query);
        setSearchResults(results);
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="artistas-container">
      <h2>Explora artistas</h2>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Busca nuevos artistas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" disabled={isSearching}>
          Buscar
        </button>
      </div>

      <div className="artistas-grid">
        {isSearching ? (
          <p>Buscando...</p>
        ) : (
          searchResults.map((artist) => (
            <div key={artist.id} className="artista-card">
              <img
                src={artist.images[0]?.url || "default-image.jpg"}
                alt={artist.name}
                width={100}
              />
              <h4>{artist.name}</h4>
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Escuchar en Spotify
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Artistas;
