function multiplicarMatrices(A, B) {
  if (A[0].length !== B.length) {
    throw new Error("El número de columnas de A debe ser igual al número de filas de B");
  }

  const filasA = A.length;
  const columnasA = A[0].length;
  const columnasB = B[0].length;

  const resultado = new Array(filasA)
    .fill(0)
    .map(() => new Array(columnasB).fill(0));

  for (let i = 0; i < filasA; i++) {
    for (let j = 0; j < columnasB; j++) {
      for (let k = 0; k < columnasA; k++) {
        resultado[i][j] += A[i][k] * B[k][j];
      }
    }
  }

  return resultado;
}

const matrizA = [
  [1, 2, 3],
  [4, 5, 6]
];

const matrizB = [
  [7, 8],
  [9, 10],
  [11, 12]
];

try {
  const resultado = multiplicarMatrices(matrizA, matrizB);
  console.log("Resultado de la multiplicación:");
  console.table(resultado);
} catch (error) {
  console.error("Error:", error.message);
}
