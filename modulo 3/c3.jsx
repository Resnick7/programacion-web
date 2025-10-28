import React, { useState } from "react";

function App() {
  const datos = {
    Argentina: ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"],
    México: ["Jalisco", "Nuevo León", "Puebla", "Yucatán"],
    España: ["Madrid", "Cataluña", "Andalucía", "Valencia"],
  };

  const [pais, setPais] = useState("");
  const [provincia, setProvincia] = useState("");

  const manejarCambioPais = (e) => {
    setPais(e.target.value);
    setProvincia(""); // reinicia la provincia
  };

  const manejarCambioProvincia = (e) => {
    setProvincia(e.target.value);
  };

  return (
    <div style={estilos.contenedor}>
      <h1>Selección de País y Provincia</h1>

      <div style={estilos.selects}>
        {/* Primer select: País */}
        <div>
          <label htmlFor="pais">País:</label><br />
          <select id="pais" value={pais} onChange={manejarCambioPais}>
            <option value="">Seleccione un país</option>
            {Object.keys(datos).map((nombrePais) => (
              <option key={nombrePais} value={nombrePais}>
                {nombrePais}
              </option>
            ))}
          </select>
        </div>

        {/* Segundo select: Provincia */}
        <div>
          <label htmlFor="provincia">Provincia / Estado:</label><br />
          <select
            id="provincia"
            value={provincia}
            onChange={manejarCambioProvincia}
            disabled={!pais} // deshabilitado si no hay país seleccionado
          >
            <option value="">
              {pais ? "Seleccione una provincia" : "Seleccione primero un país"}
            </option>
            {pais &&
              datos[pais].map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
          </select>
        </div>
      </div>

      {pais && provincia && (
        <p style={estilos.resultado}>
          Seleccionaste: <strong>{provincia}</strong> ({pais})
        </p>
      )}
    </div>
  );
}

const estilos = {
  contenedor: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
  },
  selects: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  resultado: {
    marginTop: "30px",
    fontSize: "1.2em",
    color: "#333",
  },
};

export default App;
