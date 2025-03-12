// recomendadoses.jsx
import React from 'react';
import regresoOasis from '../assets/novedades/oasis640.jpg';
import theWeekend from '../assets/novedades/theweekend.jpg';
import kevinKaarl from '../assets/novedades/kevinkaarl.jpeg';
import  becomingAledzeppelin from '../assets/novedades/zepresize.jpg';


const recomendadosData = [
    {
      id: 1,
      title: "El regreso de Oasis",
      description: "¡Oasis está de vuelta con una gira mundial imperdible! Te compartimos una playlist para revivir las mejores canciones de esta banda histórica.",
      imgSrc: regresoOasis
    },
    {
      id: 2,
      title: "Hurry Up Tomorrow",
      description: "Lanzado el 31 de enero de 2025 bajo el sello de XO y Republic Records, este es el último álbum que el artista lanza bajo dicho nombre artístico.",
      imgSrc: theWeekend
    },
  {
    id: 3,
    title: "Ultra Sodade",
    description: "En su nuevo disco, el más personal y ambicioso hasta la fecha, Kevin Kaarl relata las etapas de una ruptura con crudeza y belleza, mostrando una fuerte evolución en su sonido.",
    imgSrc: kevinKaarl // Imagen importada de Nuevo Álbum
  },
  {
    id: 4,
    title: "Becoming a Led Zeppelin",
    description: "Esta pelicula explora los orígenes y el ascenso meteórico de la icónica banda, contra todo pronóstico. Te compartimos una playlist para hacer un viaje en el tiempo a los años 70.",
    imgSrc: becomingAledzeppelin  // Imagen importada de Nuevo Álbum
  },
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
      </div>
    ))}
  </div>
</section>

  );
};

export default Recomendados;
