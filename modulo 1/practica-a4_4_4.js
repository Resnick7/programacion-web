// Aplanar una matriz tridimensional (pasarla a un arreglo), y ordenarlo.

const arr3D = [
  [
    [9, 2, 5],
    [7, 1]
  ],
  [
    [4, 8],
    [6, 3]
  ]
]

const flattened = arr3D.flat(2)
const sorted = flattened.sort((a, b) => a - b)

console.log({flattened})
console.log({sorted})
