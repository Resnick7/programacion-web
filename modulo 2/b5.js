const fs = require("fs");
const path = require("path");

const [inputFile, word, outputFile] = process.argv.slice(2);

if (!inputFile || !word || !outputFile) {
  console.error("Uso: node b5.js <archivo_entrada> <palabra> <archivo_salida>");
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);

let count = 0;
let bufferRestante = "";

const readStream = fs.createReadStream(inputPath, { encoding: "utf8" });
const writeStream = fs.createWriteStream(outputPath);

readStream.on("error", (err) => {
  console.error(`Error al leer el archivo: ${err.message}`);
  process.exit(1);
});

writeStream.on("error", (err) => {
  console.error(`Error al escribir el archivo: ${err.message}`);
  process.exit(1);
});

readStream.on("data", (chunk) => {
  const texto = bufferRestante + chunk;

  const partes = texto.split(word);
  count += partes.length - 1;

  bufferRestante = texto.slice(-word.length + 1);
});

readStream.on("end", () => {
  writeStream.write(`La palabra "${word}" aparece ${count} veces.\n`, () => {
    console.log(`Resultado escrito en ${outputPath}`);
  });
});
