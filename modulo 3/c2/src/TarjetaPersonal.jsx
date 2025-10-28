import React from "react";
import "./TarjetaPersonal.css";

function TarjetaPersonal({ nombre, profesion, imagen, habilidades }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt={nombre} className="tarjeta-imagen" />
      <h2>{nombre}</h2>
      <p><strong>Profesión:</strong> {profesion}</p>
      <h4>Habilidades:</h4>
      <ul>
        {habilidades.map((hab, index) => (
          <li key={index}>{hab}</li>
        ))}
      </ul>
    </div>
  );
}

export default TarjetaPersonal;
