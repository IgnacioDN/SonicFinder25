import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import App from './App';
import './app.css'; // Asegúrate de que esto exista y esté bien importado

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Aquí se envuelve tu App en BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
