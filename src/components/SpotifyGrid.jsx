import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { searchSpotify } from '../services/spotifyService';

const SpotifyGrid = () => {
  const [data, setData] = useState([]);  // Estado para los resultados
  const [query, setQuery] = useState('');  // Estado para la consulta
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga
  const [searchType, setSearchType] = useState('artist');  // Tipo de búsqueda (por defecto, artistas)
  const [error, setError] = useState(false);  // Estado para manejar errores

  useEffect(() => {
    if (query.trim() === '') {
      setData([]); // Si no hay consulta, limpiar los resultados
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);  // Marcar como cargando
      setError(false);  // Resetear el error
      try {
        const results = await searchSpotify(query, searchType);  // Llamada a la función de búsqueda
        if (results.length === 0) {
          setError(true);  // Si no hay resultados, marcar como error
        }
        setData(results);  // Almacenar los resultados
      } catch (err) {
        console.error("Error al buscar en Spotify:", err);
        setError(true);  // Si ocurre un error, marcar como error
      }
      setIsLoading(false);  // Desmarcar como cargando
    };

    // Llamar la búsqueda solo después de que el usuario termine de escribir (debounce)
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Limpiar el timeout en cada renderizado
  }, [query, searchType]);

  return (
    <section className="spotify-grid">
      <h2 className="spotify-grid-title">Te conectamos con Spotify</h2>

      <form className="search-form">
        <input
          type="text"
          placeholder="Buscar artistas, novedades, géneros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}  // Cambiar estado de query al escribir
          className="search-input"
        />
      </form>

      {query && (
        <p className="search-results-info">Resultados con: {query}</p>
      )}

      <div className="grid-container">
        {isLoading ? (
          <p>Cargando resultados...</p>
        ) : (
          error ? (
            <p>No se encontraron resultados.</p>  // Mostrar solo si hay un error
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
