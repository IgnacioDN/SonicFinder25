// src/services/spotifyService.js

export const getSpotifyToken = async () => {
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

export const searchSpotify = async (query, searchType) => {
  if (!query) return [];

  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    // Cambiar el tipo de búsqueda en la URL de la API dependiendo de la selección (artistas o canciones)
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=${searchType}&limit=18`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await response.json();
    console.log("Datos obtenidos de la búsqueda:", data); // Log para revisar la respuesta

    if (searchType === "artist") {
      // Devolver los artistas encontrados
      return data.artists.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        image: artist.images.length > 0 ? artist.images[0].url : 'https://via.placeholder.com/150',
        url: `https://open.spotify.com/artist/${artist.id}`,
      }));
    } else if (searchType === "track") {
      // Devolver las canciones encontradas
      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(", "),
        image: track.album.images.length > 0 ? track.album.images[0].url : 'https://via.placeholder.com/150',
        url: `https://open.spotify.com/track/${track.id}`,
      }));
    }

    return [];
  } catch (error) {
    console.error('Error al buscar en Spotify:', error);
    return [];
  }
};
