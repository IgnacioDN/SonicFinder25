import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/CategoriesMenu.css';
import bannerImage from '../assets/banners/pexels-john-tekeridis-21837-340103.jpg';

const CategoriesMenu = ({ isDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { name: 'Inicio', path: '/' },
    { name: 'Artistas', path: '/artistas' },
    { name: 'Novedades 2025' },
   
    { 
      name: 'Contacto', 
      path: '/contacto', 
      icon: <i className="fas fa-phone"></i> 
    },
  ];
  const handleCategoryClick = (category) => {
    if (category.name === 'Novedades 2025') {
      setActiveCategory(category.name);
      setModalOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCategory(null);
  };

  return (
    <nav className={`categories-menu ${isDarkMode ? 'dark-mode' : 'light-mode'} ${menuOpen ? 'menu-open' : ''}`}>
      <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      
      <ul className={`category-list ${menuOpen ? 'show' : ''}`}>
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            {category.path ? (
              <Link to={category.path} onClick={() => handleCategoryClick(category)}>
                {category.name} {category.icon && <span className="icon">{category.icon}</span>}
              </Link>
            ) : (
              <a href="#" onClick={() => handleCategoryClick(category)}>
                {category.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      {modalOpen && activeCategory === 'Novedades 2025' && (
        <div className="modal show">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <h2>Novedades 2025</h2>
            <img src={bannerImage} alt="Banner Novedades" className="modal-banner" />
            <p>Contenido detallado sobre las novedades de 2025. ¡Explora las últimas tendencias y lanzamientos!</p>
            <a
              href="https://open.spotify.com/playlist/37LIA8IcVpMhaWZY2V2Ujy"
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-button"
            >
              <i className="fab fa-spotify spotify-icon"></i> Escuchar en Spotify
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CategoriesMenu;
