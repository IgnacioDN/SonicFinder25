import React from "react";
import bannerVideo from "../assets/banners/12315445-uhd_3840_2160_25fps.mp4";

const ArtistasSlider = () => {
  return (
    <div className="artistas-slider">
      <div className="artistas-slider__banner">
        <video autoPlay loop muted className="artistas-slider__video">
          <source src={bannerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="artistas-slider__overlay">
          <h1 className="artistas-slider__title">Artistas</h1>
          <p className="artistas-slider__description">Descubre nuevos artistas y explora su música en Spotify.</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistasSlider;
