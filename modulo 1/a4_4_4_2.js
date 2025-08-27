// Dado un arreglo de objetos con {nombre, clave}, aplicar funciones de primer orden para capitalizar el nombre, y encriptar la clave.

// Datos de entrada
const usuarios = [
  { nombre: "ana", clave: "1234" },
  { nombre: "peDro", clave: "abcd" },
  { nombre: "JORGE", clave: "xyz789" }
]

// Función para capitalizar
const capitalizar = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

// Función de "encriptado" simple (ejemplo: invertir y pasar a base64)
const encriptar = str => btoa(str.split("").reverse().join(""))

// Transformación con map (función de primer orden)
const procesados = usuarios.map(u => ({
  nombre: capitalizar(u.nombre),
  clave: encriptar(u.clave)
}))

console.log(procesados)