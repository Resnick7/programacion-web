// Generar un nuevo arreglo cque contenga los cubos de los números pares.

const numeros = [ 3, 6, 7, 12, 15, 18 ]
const cubo = (num) => {
  const cubicEven = num.filter(n => n%2 === 0).map(item => (item * item * item))
  return cubicEven
}

console.log(cubo(numeros))

//Agrupa los empleados por departamento en un objeto

const empleados = [
  {nombre: "Ana", departamento: "Ventas"},
  {nombre: "Luis", departamento: "IT"},
  {nombre: "Marta", departamento: "Ventas"},
  {nombre: "Pedro", departamento: "IT"},
  {nombre: "Sofia", departamento: "Marketing"},
]

const deparmentsEmployees = (empleados) => {
  return empleados.reduce((acc, empleado) => {
    const { departamento, nombre } = empleado
    if (!acc[departamento]) {
      acc[departamento] = []
    }
    acc[departamento].push(nombre)
    return acc
  }, {})
}

console.log(deparmentsEmployees(empleados))


