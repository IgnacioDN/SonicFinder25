import React from 'react';
import videoFile from "../assets/banners/12315445-uhd_3840_2160_25fps.mp4";
import banner from "../assets/banners/pexels-dmitry-demidov-515774-3784566.jpg"; 

const InformativeSection = () => {
  return (
    <section className="informative-section">
      <h2 className="informative-title">Sobre Nosotros</h2> 
      <div className="informative-content">
        <div className="informative-left">
          <div className="informative-banner">
            <img src={banner} alt="SonicFinder Banner" />
            <div className="informative-banner-overlay">
              <h3> ¿Qué es Sonic Finder?  </h3>
              <p>Somos una productora que cuenta con estudios de grabación. Promovemos la difusión musical de artistas emergentes locales e internacionales.</p>
            </div>
          </div>
        </div>

        <div className="informative-right">
          <div className="informative-video-container">
            <div className="informative-video-overlay">
              <h3>Descubre nuestros estudios de grabación</h3>
              <p>En SonicFinder, ofrecemos estudios de última tecnología para la producción de música de alta calidad.</p>
            </div>
            <video
  className="informative-video"
  autoPlay
  muted
  loop
  playsInline
>
  <source src={videoFile} type="video/mp4" />
  Tu navegador no soporta el video.
</video>

          </div>
        </div>
      </div>
    </section>
  );
};

export default InformativeSection;

