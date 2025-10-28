import React from "react";
import TarjetaPersonal from "./TarjetaPersonal";
import "./App.css";

function App() {
  return (
    <div className="contenedor">
      <h1>Tarjetas de Personas</h1>
      <div className="tarjetas-contenedor">
        <TarjetaPersonal
          nombre="Ada Lovelace"
          profesion="Programadora"
          imagen="https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg"
          habilidades={["Matemáticas", "Lógica", "Visión de futuro"]}
        />

        <TarjetaPersonal
          nombre="Alan Turing"
          profesion="Criptógrafo"
          imagen="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
          habilidades={["Códigos", "Matemáticas", "Computación"]}
        />
      </div>
    </div>
  );
}

export default App;
