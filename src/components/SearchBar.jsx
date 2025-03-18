import { useState } from 'react';
import './SearchBar.css'; 
import { searchSpotify } from './services/spotifyService'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    const data = await onSearch(query);
    setResults(data);
  };

  return (
    <div className="search-container">
      <h2>Explora nuevos artistas</h2>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Buscar artista..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="search-results">
        {results.map((artist) => (
          <div key={artist.id} className="artist-card">
            {artist.image ? (
              <img src={artist.image} alt={artist.name} className="artist-image" />
            ) : (
              <div className="no-image">🎵</div> 
            )}
            <h3>{artist.name}</h3>
            <a href={artist.url} target="_blank" rel="noopener noreferrer" className="spotify-link">
              Ver en Spotify 🎵
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};


