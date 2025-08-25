// Dado un arreglo de objetos con {nombre, clave}, aplicar funciones de primer orden para capitalizar el nombre, y encriptar la clave.

// 1. Función que capitaliza un string
const capitalizar = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// 2. Función que elimina espacios en blanco
const limpiarEspacios = str => str.trim();


// 3. Función que encripta un string de forma simple
const encriptar = str => str.split('')
           .map(c => String.fromCharCode(c.charCodeAt(0) + 1)).join("");

// ----- Función de orden superior que recibe funciones de primer orden -----
function crearPipeline(...funciones) {
  return function(valor) {
    return funciones.reduce((acc, fn) => fn(acc), valor); //el acc se inicializa con valor
  };
}

// ----- Uso práctico -----
// Creamos diferentes pipelines dinámicamente
const pipelineNombre = crearPipeline(limpiarEspacios, capitalizar);
const pipelineClave = crearPipeline(limpiarEspacios, encriptar);

// Datos de ejemplo
const usuarios = [
  { nombre: "   juan  ", clave: "abc123 " },
  { nombre: "   mArIa", clave: "  pass99" }
];

// Aplicamos los pipelines a los datos
const usuariosProcesados = usuarios.map(u => ({
  nombre: pipelineNombre(u.nombre),
  clave: pipelineClave(u.clave)
}));

console.log("Usuarios procesados:");
console.log(usuariosProcesados);

/*
Salida esperada:
Usuarios procesados:
[
  { nombre: "Juan", clave: "bcd234" },
  { nombre: "Maria", clave: "qbtt::" }
]
*/