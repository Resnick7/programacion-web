const estudiantes = [
  { nombre: "Ana", nota: 8 },
  { nombre: "Luis", nota: 5 },
  { nombre: "Carla", nota: 9 },
  { nombre: "Juan", nota: 6 },
  { nombre: "Pedro", nota: 4 }
];

// Obtener un nuevo arreglo solo con los nombres de los estudiantes que aprobaron (nota ≥ 6).
const aprobados = estudiantes.filter((est) => est.nota > 5).map(est => est.nombre)
console.log(aprobados)

// Ordenar el arreglo original por nota de mayor a menor.
const sorted = estudiantes.sort((a, b) => b.nota - a.nota)
console.log(sorted)

// Calcular el promedio general de las notas
const promedio = estudiantes.reduce((acc, est) => acc + est.nota, 0) / estudiantes.length
console.log(promedio)