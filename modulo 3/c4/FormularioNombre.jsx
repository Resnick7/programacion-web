import React, { useState } from "react";
import "./FormularioNombre.css";

function FormularioNombre() {
  const [nombre, setNombre] = useState("");

  const manejarCambio = (e) => {
    setNombre(e.target.value);
  };

  const limpiar = () => {
    setNombre("");
  };

  return (
    <div className="formulario">
      <h2>Escribe tu nombre</h2>
      <input
        type="text"
        placeholder="Tu nombre..."
        value={nombre}
        onChange={manejarCambio}
      />
      <button onClick={limpiar}>Limpiar</button>

      <p
        className={nombre.length > 10 ? "texto-largo" : "texto-normal"}
      >
        Hola, {nombre || "..." }
      </p>
    </div>
  );
}

export default FormularioNombre;
