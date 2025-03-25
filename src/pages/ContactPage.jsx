import React, { useEffect } from "react";
import "../components/styles/ContactPage.css";
import banner from "../assets/banners/pexels-rdne-8198567.jpg";  
import Footer from "../components/Footer";

const ContactPage = () => {
  useEffect(() => {
    // Aseguramos que el scroll inicie en la parte superior al cargar la página
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-banner">
        <h1>Contacto</h1>
        <p>Conéctate con nosotros para más información sobre Sonic Finder.</p>
        <img src={banner} alt="Imagen de contacto" className="contact-banner-image" />
      </div>
      
      <div className="contact-info-cards">
        <div className="contact-card">
          <h3>Ubicación</h3>
          <p>Buenos Aires, Argentina</p>
        </div>
        <div className="contact-card">
          <h3>Servicios</h3>
          <p>Producción musical, 
            Estudios de grabación,
            Difusión de artistas. 
          </p>
        </div>
        <div className="contact-card">
          <h3>Email</h3>
          <p>ignaciodiazneila@gmail.com</p>
        </div>
      </div>
      
      <div className="contact-form-container">
        <h2>Envíanos un mensaje</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Tu Nombre" required />
          <input type="email" name="email" placeholder="Tu Email" required />
          <textarea name="message" placeholder="Tu Mensaje" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
