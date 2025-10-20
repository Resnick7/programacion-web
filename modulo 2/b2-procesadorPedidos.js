function generarEstadoAleatorio() {
  const estados = ["pendiente", "procesado", "error"];
  const indice = Math.floor(Math.random() * estados.length);
  return estados[indice];
}

const pedidos = [
  { id: 1, producto: "Teclado", cantidad: 2, estado: generarEstadoAleatorio() },
  { id: 2, producto: "Mouse", cantidad: 5, estado: generarEstadoAleatorio() },
  { id: 3, producto: "Monitor", cantidad: 1, estado: generarEstadoAleatorio() },
  { id: 4, producto: "Parlantes", cantidad: 3, estado: generarEstadoAleatorio() },
  { id: 5, producto: "Notebook", cantidad: 1, estado: generarEstadoAleatorio() },
];

function procesarPedidos(pedidos) {
  console.time("Tiempo de procesamiento de pedidos");

  let pendientes = 0;
  let procesados = 0;
  let errores = 0;

  pedidos.forEach((pedido) => {
    switch (pedido.estado) {
      case "procesado":
        console.log(`✅ Pedido ${pedido.id} (${pedido.producto}) procesado correctamente.`);
        procesados++;
        break;
      case "pendiente":
        console.warn(`⚠️ Pedido ${pedido.id} (${pedido.producto}) está pendiente.`);
        pendientes++;
        break;
      case "error":
        console.error(`❌ Error en el pedido ${pedido.id} (${pedido.producto}).`);
        errores++;
        break;
      default:
        console.error(`Estado desconocido para el pedido ${pedido.id}.`);
    }
  });

  console.timeEnd("Tiempo de procesamiento de pedidos");

  console.log("\n📋 Tabla de pedidos:");
  console.table(pedidos);

  console.log("\n📊 Resumen:");
  console.log(`Procesados: ${procesados}`);
  console.log(`Pendientes: ${pendientes}`);
  console.log(`Errores: ${errores}`);
}

procesarPedidos(pedidos);
