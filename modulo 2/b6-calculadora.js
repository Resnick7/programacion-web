const args = process.argv.slice(2)

if (args.length !== 3) {
  process.stderr.write("Error: Debes ingresar exactamente 3 parámetros.\n")
  process.stderr.write("Ejemplo: node calculadora.js suma 4 5\n")
  process.exit(1)
}

const [operacion, num1Str, num2Str] = args

const num1 = Number(num1Str)
const num2 = Number(num2Str)

if (isNaN(num1) || isNaN(num2)) {
  process.stderr.write("Error: Los dos últimos parámetros deben ser números válidos.\n")
  process.exit(1)
}

if (process.env.DEBUG === "true") {
  process.stdout.write(`DEBUG: Operación = ${operacion}, Num1 = ${num1}, Num2 = ${num2}\n`)
}

let resultado

switch (operacion.toLowerCase()) {
  case "suma":
    resultado = num1 + num2
    break
  case "resta":
    resultado = num1 - num2
    break
  case "mul":
  case "multiplicacion":
    resultado = num1 * num2
    break
  case "div":
  case "division":
    if (num2 === 0) {
      process.stderr.write("Error: No se puede dividir por cero.\n")
      process.exit(1)
    }
    resultado = num1 / num2
    break
  default:
    process.stderr.write("Error: Operación inválida. Usa suma, resta, mul o div.\n")
    process.exit(1)
}

process.stdout.write(`Resultado: ${resultado}\n`)
