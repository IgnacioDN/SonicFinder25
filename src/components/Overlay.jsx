import React, { useState, useEffect } from 'react';

const BannerSlider = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
      console.log("Mensaje actual:", messages[currentMessage]); 
    }, 4000);
    return () => clearInterval(interval);
  }, [currentMessage]);  
  

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-item">
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="carousel-image"
          />
          {/}
          <Overlay />
        </div>

        {}
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
