const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]

// La suma de cada fila.
const rowSums = matriz.map(fila =>
  fila.reduce((acc, num) => acc + num, 0)
)

console.log({rowSums})

// La suma de cada columna.
const colSums = matriz.reduce((acc, fila) => {
  fila.forEach((num, i) => {
    acc[i] = (acc[i] || 0) + num
  })
  return acc
}, [])

console.log({colSums})