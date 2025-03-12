import React, { useState, useEffect } from 'react';

const BannerSlider = ({ banners, onDiscover }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "Bienvenido a SonicFinder: tu portal para descubrir música.",
    "Conéctate con Spotify para sorprenderte con nuevas recomendaciones.",
  ];

  // Función para cambiar al siguiente banner
  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Función para cambiar al banner anterior
  const prevBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
  
    return () => clearInterval(interval);
  }, [currentMessage]);
  
  // Función para hacer scroll al "informative-section"
  const handleDiscoverClick = () => {
    const section = document.getElementById("informative-section");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-item">
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="carousel-image"
          />
          <div className="carousel-overlay">
            <h2>{messages[currentMessage]}</h2>
            <button className="discover-button" onClick={handleDiscoverClick}>Ver más</button>
          </div>
        </div>

        {/* Botones para navegar entre los banners */}
        <button className="carousel-button carousel-button-left" onClick={prevBanner}>
          &lt;
        </button>
        <button className="carousel-button carousel-button-right" onClick={nextBanner}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BannerSlider;