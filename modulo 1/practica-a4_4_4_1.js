// Crea un objeto Libro con propiedades titulo, autor, anio. Agrega un método descripcion() que muestre la información.

const libro = {
  titulo: "El señor de los anillos",
  autor: "Tolkien",
  anio: "2000",
  description: () => console.log(`${libro.titulo} fue escrito por ${libro.autor} en el ${libro.anio}`)
}

// libro.description()

// Modela un objeto cuentaBancaria con propiedades saldo, titular.  Métodos: depositar(monto) y retirar(monto).
const cuentaBancaria = {
  saldo: 20000,
  titular: "Matias Collado",
  depositar: (monto) => cuentaBancaria.saldo = cuentaBancaria.saldo + monto,
  retirar: (monto) => cuentaBancaria.saldo = cuentaBancaria.saldo - monto,
}

// console.log(cuentaBancaria.saldo, cuentaBancaria.depositar(2000), cuentaBancaria.saldo)
// console.log(cuentaBancaria.saldo, cuentaBancaria.retirar(2000), cuentaBancaria.saldo)

// Crea un objeto Rectangulo con ancho y alto.  Métodos: area() y perimetro().
const rectangulo = {
  ancho: 2,
  alto: 10,
  area: () => `${rectangulo.alto * rectangulo.ancho} m²`,
  perimetro: () => `${rectangulo.alto * 2 + rectangulo.ancho * 2} m`,
}

console.log(rectangulo.area(), rectangulo.perimetro())