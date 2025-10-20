// Modificar la aplicación del ejercicio anterior para que se guarde una nota en cada fichero separado.

const fs = require("fs");
const path = require("path");

const DIR_PATH = path.join(__dirname, "notas");

if (!fs.existsSync(DIR_PATH)) {
  fs.mkdirSync(DIR_PATH);
}

function debug(msg) {
  if (process.env.DEBUG === "true") {
    process.stdout.write(`DEBUG: ${msg}\n`);
  }
}

function listarArchivos() {
  const archivos = fs.readdirSync(DIR_PATH);
  if (archivos.length === 0) {
    process.stdout.write("\n📂 No hay notas guardadas.\n");
  } else {
    process.stdout.write("\n📒 Notas guardadas:\n");
    archivos.forEach((archivo, i) => {
      process.stdout.write(`${i + 1}. ${archivo.replace(".txt", "")}\n`);
    });
  }
}

const args = process.argv.slice(2);
const comando = args[0];

if (!comando) {
  process.stderr.write("Error: Debes indicar un comando (agregar, leer, listar, eliminar, editar).\n");
  process.exit(1);
}

switch (comando.toLowerCase()) {
  case "agregar": {
    const [titulo, cuerpo] = args.slice(1);
    if (!titulo || !cuerpo) {
      process.stderr.write("Error: Debes ingresar un título y un cuerpo.\n");
      process.exit(1);
    }

    const filePath = path.join(DIR_PATH, `${titulo}.txt`);
    if (fs.existsSync(filePath)) {
      process.stderr.write(`Error: Ya existe una nota con el título "${titulo}".\n`);
      process.exit(1);
    }

    fs.writeFileSync(filePath, cuerpo);
    process.stdout.write(`✅ Nota "${titulo}" creada correctamente.\n`);
    debug(`Archivo guardado en: ${filePath}`);
    break;
  }

  case "leer": {
    const titulo = args[1];
    if (!titulo) {
      process.stderr.write("Error: Debes ingresar el título de la nota a leer.\n");
      process.exit(1);
    }

    const filePath = path.join(DIR_PATH, `${titulo}.txt`);
    if (!fs.existsSync(filePath)) {
      process.stderr.write(`Error: No existe una nota con el título "${titulo}".\n`);
      process.exit(1);
    }

    const contenido = fs.readFileSync(filePath, "utf-8");
    process.stdout.write(`\n📘 ${titulo}\n${contenido}\n`);
    break;
  }

  case "listar": {
    listarArchivos();
    break;
  }

  case "eliminar": {
    const titulo = args[1];
    if (!titulo) {
      process.stderr.write("Error: Debes ingresar el título de la nota a eliminar.\n");
      process.exit(1);
    }

    const filePath = path.join(DIR_PATH, `${titulo}.txt`);
    if (!fs.existsSync(filePath)) {
      process.stderr.write(`Error: No existe una nota con el título "${titulo}".\n`);
      process.exit(1);
    }

    fs.unlinkSync(filePath);
    process.stdout.write(`🗑️  Nota "${titulo}" eliminada correctamente.\n`);
    break;
  }

  case "editar": {
    const [titulo, nuevoCuerpo] = args.slice(1);
    if (!titulo || !nuevoCuerpo) {
      process.stderr.write("Error: Debes ingresar el título y el nuevo contenido.\n");
      process.exit(1);
    }

    const filePath = path.join(DIR_PATH, `${titulo}.txt`);
    if (!fs.existsSync(filePath)) {
      process.stderr.write(`Error: No existe una nota con el título "${titulo}".\n`);
      process.exit(1);
    }

    fs.writeFileSync(filePath, nuevoCuerpo);
    process.stdout.write(`Nota "${titulo}" actualizada correctamente.\n`);
    break;
  }

  default:
    process.stderr.write("Error: Comando inválido. Usa agregar, leer, listar, eliminar o editar.\n");
    process.exit(1);
}

listarArchivos();
