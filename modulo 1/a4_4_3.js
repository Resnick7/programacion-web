// Dada una matriz cuadrada (n x n), escribir una función que obtenga:
// La diagonal principal.

const matriz = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
]

const diagonalPrincipal = (matriz) => {
  const diagonalPrincipal = []
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (i === j) diagonalPrincipal.push(matriz[i][j])
    }
  }

  return diagonalPrincipal
}

// console.log(diagonalPrincipal(matriz))

// La diagonal secundaria.

const diagonalSecundaria = () => {
  const diagonalSecundaria = []

  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (i + j === matriz.length - 1) diagonalSecundaria.push(matriz[i][j])
    }
  }

  return diagonalSecundaria
}

// console.log(diagonalSecundaria(matriz))

// La suma de ambas diagonales.

const sumaDiagonales = (d1, d2) => {
  const suma = []

  for (let i = 0; i < d1.length; i++) {
    suma[i] = d1[i] + d2[i]
  }

  return suma
}

console.log(sumaDiagonales(diagonalPrincipal(matriz), diagonalSecundaria(matriz)))