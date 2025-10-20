// Crear una aplicación donde el usuario pueda:

// 1.Crear una nueva nota.
// 2.Leer una nota existente.
// 3.Listar todas las notas.
// 4.Eliminar una nota.

const fs = require("fs")

const FILE_PATH = "notas.json"

function cargarNotas() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function guardarNotas(notas) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(notas, null, 2))
}

function debug(msg) {
  if (process.env.DEBUG === "true") {
    process.stdout.write(`DEBUG: ${msg}\n`)
  }
}

const args = process.argv.slice(2)
const comando = args[0]

if (!comando) {
  process.stderr.write("Error: Debes indicar un comando (agregar, leer, listar, eliminar, editar).\n")
  process.exit(1)
}

let notas = cargarNotas()

switch (comando.toLowerCase()) {
  case "agregar": {
    const [titulo, cuerpo] = args.slice(1)
    if (!titulo || !cuerpo) {
      process.stderr.write("Error: Debes ingresar un título y un cuerpo.\n")
      process.exit(1)
    }

    if (notas.find(nota => nota.titulo === titulo)) {
      process.stderr.write("Error: Ya existe una nota con ese título.\n")
      process.exit(1)
    }

    notas.push({ titulo, cuerpo })
    guardarNotas(notas)
    process.stdout.write(`Nota "${titulo}" agregada exitosamente.\n`)
    debug(`Notas actuales: ${JSON.stringify(notas)}`)
    break
  }

  case "leer": {
    const titulo = args[1]
    if (!titulo) {
      process.stderr.write("Error: Debes ingresar el título de la nota a leer.\n")
      process.exit(1)
    }

    const nota = notas.find(n => n.titulo === titulo)
    if (!nota) {
      process.stderr.write("Error: No se encontró la nota.\n")
      process.exit(1)
    }

    process.stdout.write(`\n📘 ${nota.titulo}\n${nota.cuerpo}\n`)
    break
  }

  case "listar": {
    if (notas.length === 0) {
      process.stdout.write("No hay notas guardadas.\n")
    } else {
      process.stdout.write("📒 Listado de notas:\n")
      notas.forEach((n, i) => {
        process.stdout.write(`${i + 1}. ${n.titulo}\n`)
      })
    }
    break
  }

  case "eliminar": {
    const titulo = args[1]
    if (!titulo) {
      process.stderr.write("Error: Debes ingresar el título de la nota a eliminar.\n")
      process.exit(1)
    }

    const nuevasNotas = notas.filter(n => n.titulo !== titulo)
    if (nuevasNotas.length === notas.length) {
      process.stderr.write("Error: No se encontró la nota a eliminar.\n")
      process.exit(1)
    }

    guardarNotas(nuevasNotas)
    process.stdout.write(`Nota "${titulo}" eliminada correctamente.\n`)
    break
  }

  case "editar": {
    const [titulo, nuevoCuerpo] = args.slice(1)
    if (!titulo || !nuevoCuerpo) {
      process.stderr.write("Error: Debes ingresar el título y el nuevo contenido.\n")
      process.exit(1)
    }

    const nota = notas.find(n => n.titulo === titulo)
    if (!nota) {
      process.stderr.write("Error: No se encontró la nota a editar.\n")
      process.exit(1)
    }

    nota.cuerpo = nuevoCuerpo
    guardarNotas(notas)
    process.stdout.write(`Nota "${titulo}" actualizada correctamente.\n`)
    break
  }

  default:
    process.stderr.write("Error: Comando inválido. Usa agregar, leer, listar, eliminar o editar.\n")
    process.exit(1)
}
