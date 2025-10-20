// app.js
const http = require("http");

// Crear el servidor
const server = http.createServer((req, res) => {
  const ruta = req.url;
  console.log(`📥 Petición recibida: ${ruta}`);

  switch (ruta) {
    // Página HTML de bienvenida
    case "/":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <title>Servidor ITU</title>
          <style>
            body { font-family: Arial; text-align: center; margin-top: 50px; background: #f4f4f4; }
            h1 { color: #2c3e50; }
          </style>
        </head>
        <body>
          <h1>Bienvenido al servidor del ITU</h1>
          <p>Usa las rutas <b>/saludo</b> y <b>/fecha</b> para ver más respuestas.</p>
        </body>
        </html>
      `);
      break;

    // Saludo en formato JSON
    case "/saludo":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      const saludo = {
        mensaje: "¡Hola visitante!",
        servidor: "Servidor del ITU",
        fecha: new Date().toLocaleString()
      };
      res.end(JSON.stringify(saludo, null, 2));
      break;

    // Fecha y hora actual en texto plano
    case "/fecha":
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end(`Fecha y hora actual: ${new Date().toLocaleString()}`);
      break;

    // Cualquier otra ruta
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end("Error 404: Ruta no encontrada");
      break;
  }
});

// Puerto del servidor
const PORT = 3000;

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
