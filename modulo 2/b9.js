// app.js
const http = require("http");

// Crear el servidor
const server = http.createServer((req, res) => {
  // Configurar encabezado de respuesta
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // Obtener la ruta solicitada
  const ruta = req.url;

  // Registrar en consola (útil para depuración)
  console.log(`📥 Petición recibida: ${ruta}`);

  // Definir las respuestas según la ruta
  switch (ruta) {
    case "/":
      res.statusCode = 200;
      res.end("Bienvenido al servidor del ITU");
      break;

    case "/saludo":
      res.statusCode = 200;
      res.end("hola visitante");
      break;

    case "/fecha":
      res.statusCode = 200;
      const fechaActual = new Date().toLocaleString();
      res.end(`Fecha y hora actual: ${fechaActual}`);
      break;

    default:
      res.statusCode = 404;
      res.end("Error 404: Ruta no encontrada");
      break;
  }
});

// Definir el puerto
const PORT = 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
