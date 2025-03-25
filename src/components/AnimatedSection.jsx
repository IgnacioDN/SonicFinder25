import React, { useState, useEffect, useRef } from 'react';

const AnimatedSection = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Activamos la animación cuando entra en vista
        }
      },
      { threshold: 0.5 } // La animación se activa cuando el 50% del elemento es visible
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect(); // Desconectamos el observer cuando el componente se desmonta
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${className} ${isVisible ? 'active' : ''}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
