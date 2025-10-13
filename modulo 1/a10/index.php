<?php
session_start();

// Inicializar carrito si no existe
if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

// Definimos productos (esto podría venir de la BD)
$productos = [
    1 => ["nombre" => "Producto A", "precio" => 10],
    2 => ["nombre" => "Producto B", "precio" => 20],
    3 => ["nombre" => "Producto C", "precio" => 30],
];

// Cantidad de ítems en el carrito
$total_items = array_sum($_SESSION['carrito']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Tienda</title>
    <style>
        .producto {
            display: inline-block;
            border: 1px solid #ccc;
            padding: 15px;
            margin: 10px;
            text-align: center;
            width: 120px;
        }
        .carrito {
            float: right;
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
        }
        button {
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <h1>Tienda</h1>

    <div class="carrito">
        🛒 Carrito (<?php echo $total_items; ?> items)
        <form action="carrito.php" method="post" style="margin-top:10px;">
            <input type="hidden" name="accion" value="vaciar">
            <button type="submit">Vaciar carrito</button>
        </form>
    </div>

    <?php foreach ($productos as $id => $prod): ?>
        <div class="producto">
            <h3><?php echo $prod['nombre']; ?></h3>
            <p>$<?php echo $prod['precio']; ?></p>
            <form action="carrito.php" method="post">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                <input type="hidden" name="accion" value="agregar">
                <button type="submit">Agregar al carrito</button>
            </form>
        </div>
    <?php endforeach; ?>

    <h2>Contenido del carrito</h2>
    <ul>
        <?php
        if (empty($_SESSION['carrito'])) {
            echo "<li>El carrito está vacío</li>";
        } else {
            foreach ($_SESSION['carrito'] as $id => $cantidad) {
                echo "<li>".$productos[$id]['nombre']." - ".$cantidad."</li>";
            }
        }
        ?>
    </ul>
</body>
</html>
