import React from 'react';
import regresoOasis from '../assets/novedades/oasis640final.jpg';
import theWeekend from '../assets/novedades/theweekend.jpg';
import kevinKaarl from '../assets/novedades/kevinkaarl.jpeg';
import  becomingAledzeppelin from '../assets/novedades/zeppelinposter.jpeg';


const recomendadosData = [
  {
    id: 1,
    title: "El regreso de Oasis",
    description: "¡Oasis está de vuelta con una gira mundial imperdible que empieza este año! Te compartimos una playlist para revivir las mejores canciones de esta banda histórica.",
    imgSrc: regresoOasis,
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbP9O5gwI0xP"
  },
  {
    id: 2,
    title: "Hurry Up Tomorrow",
    description: "Lanzado el 31 de enero de 2025 bajo el sello de XO y Republic Records, este es el último álbum que el artista lanza bajo dicho nombre artístico.",
    imgSrc: theWeekend,
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DX6bnzK9KPvrz"
  },
  {
    id: 3,
    title: "Ultra Sodade",
    description: "En su nuevo disco, el más personal y ambicioso hasta la fecha, Kevin Kaarl relata las etapas de una ruptura con belleza, mostrando una evolución en su sonido.",
    imgSrc: kevinKaarl,
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO41O9oc"
  },
  {
    id: 4,
    title: "Becoming a Led Zeppelin",
    description: "Esta película explora los orígenes y el ascenso meteórico de la icónica banda. Te compartimos una playlist para hacer un viaje en el tiempo a los años 70.",
    imgSrc: becomingAledzeppelin,
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO1NyWWI"
  }
];

const Recomendados = () => {
  return (
    <section className="recomendados" id="recomendados">
      <h2 className="recomendados-title">Recomendados</h2>
      <div className="recomendados-container">
        {recomendadosData.map((recomendados) => (
          <div className="recomendados-item" key={recomendados.id}>
            <img src={recomendados.imgSrc} alt={recomendados.title} />
            <h3>{recomendados.title}</h3>
            <p>{recomendados.description}</p>
            <div className="recomendados-button-container">
            <a 
              href={recomendados.playlistUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="recomendados-spotify-button"
            >
              Escuchar en Spotify
            </a>
          </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Recomendados;
