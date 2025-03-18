import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

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

const searchSpotify = async (query, searchType) => {
  if (!query) return [];

  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    // Modificar el tipo de búsqueda según el tipo (artistas o canciones)
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${searchType}&limit=18`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await response.json();
    console.log("Datos obtenidos de la búsqueda:", data); // Log para revisar la respuesta

    // Verificar si los datos existen y mapearlos dependiendo del tipo de búsqueda
    if (!data[searchType + 's'] || !data[searchType + 's'].items) {
      throw new Error(`No se encontraron ${searchType === 'artist' ? 'artistas' : 'canciones'}`);
    }

    // Mapeo de los resultados dependiendo del tipo de búsqueda
    if (searchType === 'artist') {
      return data.artists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        image: artist.images.length > 0 ? artist.images[0].url : 'https://via.placeholder.com/150',
        url: `https://open.spotify.com/artist/${artist.id}`,
      }));
    } else if (searchType === 'track') {
      return data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        image: track.album.images.length > 0 ? track.album.images[0].url : 'https://via.placeholder.com/150',
        url: `https://open.spotify.com/track/${track.id}`,
      }));
    }
  } catch (error) {
    console.error('Error al buscar en Spotify:', error);
    return [];
  }
};

const SpotifyGrid = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchType, setSearchType] = useState('artist'); // Nuevo estado para tipo de búsqueda

  useEffect(() => {
    if (query.trim() === '') {
      setData([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      const results = await searchSpotify(query, searchType); // Pasar searchType aquí
      setData(results);
      setIsLoading(false);
    }, 500); // 500ms de espera para debouncing

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchType]); // Ejecutar también cuando cambie el tipo de búsqueda

  return (
    <section className="spotify-grid">
      <h2 className="spotify-grid-title">Te conectamos con Spotify</h2>

      <form className="search-form">
        <input
          type="text"
          placeholder="Buscar artistas, novedades, géneros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="search-filters">
        <div className="filter-option">
          <button
            onClick={() => setSearchType('artist')} 
            className={searchType === 'artist' ? 'active' : ''}
          >
            Artistas
          </button>
        </div>
        <div className="filter-option">
          <button
            onClick={() => setSearchType('track')} 
            className={searchType === 'track' ? 'active' : ''}
          >
            Canciones
          </button>
        </div>
      </div>

      {query && (
        <p className="search-results-info">Resultados con: {query}</p>
      )}

      <div className="grid-container">
        {isLoading ? (
          <p>Cargando resultados...</p>
        ) : (
          data.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            data.map((item) => (
              <div key={item.id} className="grid-item">
                <img
                  src={item.image || '/default-image.jpg'}
                  alt={item.name}
                  onError={(e) => e.target.src = '/default-image.jpg'} // Manejo de errores de imagen
                />
                <h3>{item.name}</h3>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />
                  {searchType === 'artist' ? 'Escuchar en Spotify' : 'Ver en Spotify'}
                </a>
              </div>
            ))
          )
        )}
      </div>
    </section>
  );
};

export default SpotifyGrid;
