import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import "../CategoriesMenu.css";
import BannerImage from '../assets/banners/pexels-john-tekeridis-21837-340103.jpg';

const CategoriesMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const categories = [
    { name: 'Artistas', path: '/artistas' }, 
    { name: 'Géneros', path: '/generos' },
    { name: 'Novedades 2025' }, 
    { name: 'Discográficas', path: '/discograficas' },
    { name: 'Contacto', path: '/contacto', icon: <i className="fas fa-phone"></i> }
  ];

  const handleCategoryClick = (category) => {
    if (category.name === "Novedades 2025") {
      setActiveCategory(category.name);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveCategory(null);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalOpen]);

  return (
    <nav className="categories-menu">
      <div className="menu">
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="category-item">
              {category.path ? (
                <Link to={category.path} className="category-link">
                  {category.name}
                  {category.icon && <span className="icon">{category.icon}</span>}
                </Link>
              ) : (
                <a href="#" className="category-link" onClick={() => handleCategoryClick(category)}>
                  {category.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {modalOpen && activeCategory === "Novedades 2025" && (
        <div className={`modal show`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <h2>{activeCategory}</h2>
            <img src={BannerImage} alt="Banner Novedades" className="modal-banner" />
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
