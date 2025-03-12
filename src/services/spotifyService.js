const clientId = 'e936a2c33fbd4ee4b3121cdf20207874';
const clientSecret = '36b2e82ae9f44a0c8b795187fa07b8d6';

// 🔹 Función para obtener el token de acceso
const getSpotifyToken = async () => {
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
    console.log('Token recibido:', data.access_token);  // 👈 Log para depuración
    return data.access_token;
  } catch (error) {
    console.error('Error en getSpotifyToken:', error);
    return null;
  }
};

// 🔹 Función para buscar artistas en Spotify
export const searchSpotify = async (query) => {
  if (!query) return [];

  const token = await getSpotifyToken();
  if (!token) return [];

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=12`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    console.log('Respuesta de Spotify:', data);  // Log para ver la respuesta completa de la búsqueda
    
    if (!data.artists || !data.artists.items) {
      throw new Error('No se encontraron artistas');
    }

    return data.artists.items.map(artist => {
      console.log('Datos del artista:', artist);  // Log para ver los datos de cada artista

      // Verificando si el artista tiene imagen
      const image = artist.images.length > 0 ? artist.images[0].url : 'https://via.placeholder.com/150'; 
      console.log('Imagen del artista:', image); // Log para verificar la imagen

      return {
        id: artist.id,
        name: artist.name,
        image: image,  // Usar la imagen obtenida
        url: `https://open.spotify.com/artist/${artist.id}`
      };
    });
  } catch (error) {
    console.error('Error al buscar artistas:', error);
    return [];
  }
};
