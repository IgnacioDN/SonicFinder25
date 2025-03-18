import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './components/styles/App.css';
import Header from "./components/Header";
import CategoriesMenu from "./components/CategoriesMenu"; 
import BannerSlider from "./components/BannerSlider";
import SpotifyGrid from "./components/SpotifyGrid";
import Recomendados from "./components/Recomendados";
import Content from "./components/Content";
import { searchSpotify } from "./services/spotifyService";
import InformativeSection from "./components/InformativeSection";
import Footer from "./components/Footer";

import Artistas from "./pages/Artistas";
import Contacto from "./pages/Contacto";
import Discograficas from "./pages/Discograficas";

import banner1 from "./assets/banners/bannerconcertmedium.jpg";
import banner2 from "./assets/banners/pexels-chaitaastic-2093323.jpg";
import banner3 from "./assets/banners/pexels-jc-siller-30672065-8649332.jpg";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isMobile, setIsMobile] = useState(false);  

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { 
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".fade-in").forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          element.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setQuery("");
    setSearchResults([]);
  }, [location.pathname]);

  const handleSearch = async () => {
    if (!query) return;
    setIsSearching(true);
    const results = await searchSpotify(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  useEffect(() => {
    const timer = setTimeout(handleSearch, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} isMobile={isMobile} />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <BannerSlider banners={[banner1, banner2, banner3]} />
              <SpotifyGrid />
              <InformativeSection />
              <Recomendados />
              <Content />
              <Footer />
            </>
          }
        />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/discograficas" element={<Discograficas />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </div>
  );
};

export default App;
