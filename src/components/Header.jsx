import React, { useState, useEffect } from "react";
import CategoriesMenu from "./CategoriesMenu";
import "./styles/Header.css";
import logo from "../assets/logo/cover-removebg-preview.png"; 

const Header = ({ isDarkMode, toggleTheme }) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${sticky ? "sticky" : ""} ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="logo-container">
        <img 
          src={logo} 
          alt="SonicFinder Logo" 
          className="logo" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          style={{ cursor: "pointer" }} 
        />
      </div>

      <CategoriesMenu isDarkMode={isDarkMode} />

      <button onClick={toggleTheme} className="modo-oscuro-btn">
        {isDarkMode ? "Modo Oscuro" : "Modo Claro"}
        <i className={isDarkMode ? "fas fa-moon" : "fas fa-sun"}></i>
      </button>
    </header>
  );
};

export default Header;
