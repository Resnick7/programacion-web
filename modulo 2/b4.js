const EventEmitter = require("events")

class GestorUsuarios extends EventEmitter {
  constructor() {
    super();
    this.usuariosActivos = new Set();
  }

  login(usuario) {
    if (this.usuariosActivos.has(usuario)) {
      this.emit("error", `El usuario "${usuario}" ya está conectado.`);
      return;
    }
    this.usuariosActivos.add(usuario);
    this.emit("login", usuario);
  }

  enviarMensaje(usuario, mensaje) {
    if (!this.usuariosActivos.has(usuario)) {
      this.emit("error", `El usuario "${usuario}" no está activo.`);
      return;
    }
    if (!mensaje || mensaje.trim() === "") {
      this.emit("error", `El mensaje de "${usuario}" está vacío.`);
      return;
    }
    this.emit("mensaje", usuario, mensaje);
  }

  logout(usuario) {
    if (!this.usuariosActivos.has(usuario)) {
      this.emit("error", `El usuario "${usuario}" no estaba conectado.`);
      return;
    }
    this.usuariosActivos.delete(usuario);
    this.emit("logout", usuario);
  }
}

const gestor = new GestorUsuarios();

gestor.on("login", (usuario) => {
  console.log(`${usuario} ha iniciado sesión.`);
});

gestor.on("mensaje", (usuario, mensaje) => {
  console.log(`[${usuario}]: ${mensaje}`);
});

gestor.on("logout", (usuario) => {
  console.log(`${usuario} ha cerrado sesión.`);
});

gestor.on("error", (errorMsg) => {
  console.error(`Error: ${errorMsg}`);
});

setTimeout(() => gestor.login("Ana"), 1000);
setTimeout(() => gestor.login("Luis"), 2000);
setTimeout(() => gestor.enviarMensaje("Ana", "Hola a todos!"), 3000);
setTimeout(() => gestor.enviarMensaje("Luis", ""), 4000);
setTimeout(() => gestor.enviarMensaje("Pedro", "Estoy intentando entrar..."), 5000);
setTimeout(() => gestor.logout("Ana"), 6000);
setTimeout(() => gestor.logout("Luis"), 7000);
setTimeout(() => gestor.logout("Pedro"), 8000);