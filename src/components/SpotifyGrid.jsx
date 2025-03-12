// src/components/SpotifyGrid.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons'; // Importar el ícono de Spotify


const getSpotifyToken = async () => {
  const clientId = 'e936a2c33fbd4ee4b3121cdf20207874';
  const clientSecret = '36b2e82ae9f44a0c8b795187fa07b8d6';
  const credentials = `${clientId}:${clientSecret}`;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(credentials)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) throw new Error('Error al obtener token de Spotify');

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error en getSpotifyToken:', error);
    return null;
  }
};

export const searchSpotify = async (query) => {
  if (!query) return [];

  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if (!data.artists || !data.artists.items) {
      throw new Error('No se encontraron artistas');
    }

    return data.artists.items.map(artist => {
      const image = artist.images.length > 0 ? artist.images[0].url : 'https://via.placeholder.com/150';
      return {
        id: artist.id,
        name: artist.name,
        image: image,
        url: `https://open.spotify.com/artist/${artist.id}`
      };
    });
  } catch (error) {
    console.error('Error al buscar artistas:', error);
    return [];
  }
};

const SpotifyGrid = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    setIsLoading(true);

    const results = await searchSpotify(query);
    setData(results);
    setIsLoading(false);
  };

  return (
    <section className="spotify-grid">
      <h2 className="spotify-grid-title">Te conectamos con Spotify</h2>
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar artistas, novedades, géneros..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      {isLoading ? (
        <p>Cargando artistas...</p>
      ) : (
<div className="grid-container">
  {data.length > 0 ? (
    data.map((artist) => (
      <div key={artist.id} className="grid-item">
        <img src={artist.image} alt={artist.name} />
        <h3>{artist.name}</h3>
        <a href={artist.url} target="_blank" rel="noopener noreferrer">
  <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
  Escuchar en Spotify
</a>
      </div>
    ))
  ) : (
    <p>No se encontraron resultados.</p>
  )}
</div>
      )}
    </section>
  );
};

export default SpotifyGrid;
