const usuarios = [
  { id: 1, nombre: "Ana" },
  { id: 2, nombre: "Bruno" },
  { id: 3, nombre: "Carla" },
];

const pedidos = [
  { id: 101, userId: 1, producto: "Teclado", cantidad: 2 },
  { id: 102, userId: 1, producto: "Mouse", cantidad: 1 },
  { id: 201, userId: 2, producto: "Monitor", cantidad: 1 },
];

const detallesPedidos = {
  101: { precio: 50, fecha: "2025-10-13", estado: "Enviado" },
  102: { precio: 25, fecha: "2025-10-10", estado: "Entregado" },
  201: { precio: 300, fecha: "2025-10-09", estado: "Pendiente" },
};

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = usuarios.find((u) => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error(`Usuario con id ${id} no encontrado.`));
      }
    }, 2000);
  });
}

function getOrdersByUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = pedidos.filter((p) => p.userId === userId);
      resolve(userOrders);
    }, 1000);
  });
}

function getOrderDetails(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(detallesPedidos[orderId]);
    }, 1500);
  });
}

// PARTE A

function ejecutarConThen(userId) {
  console.log("=== PARTE A: then() y catch() ===");

  getUser(userId)
    .then((user) => {
      console.log(`Usuario encontrado: ${user.nombre}`);
      return getOrdersByUser(user.id);
    })
    .then((orders) => {
      if (orders.length === 0) {
        console.log("[]");
        return;
      }

      console.log("Pedidos encontrados:", orders);

      orders.forEach((order) => {
        getOrderDetails(order.id)
          .then((details) => {
            console.log(
              `Pedido ${order.id}: ${order.producto} x${order.cantidad} - $${details.precio} (${details.estado})`
            );
          })
          .catch((err) => console.error("Error al obtener detalles:", err));
      });
    })
    .catch((err) => console.error("Error:", err.message));
}

// PARTE B

async function ejecutarConAsync(userId) {
  console.log("\n=== PARTE B: async / await ===");

  try {
    const user = await getUser(userId);
    console.log(`Usuario encontrado: ${user.nombre}`);

    const orders = await getOrdersByUser(user.id);
    if (orders.length === 0) {
      console.log("[]");
      return;
    }

    console.log("Pedidos encontrados:", orders);

    for (const order of orders) {
      const details = await getOrderDetails(order.id);
      console.log(
        `🧾 Pedido ${order.id}: ${order.producto} x${order.cantidad} - $${details.precio} (${details.estado})`
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const userId = 1;

ejecutarConThen(userId);

setTimeout(() => {
  ejecutarConAsync(userId);
}, 8000);
