<?php
session_start();
include "conexion.php";

// Proteger acceso
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

// Registrar nueva especialidad
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['nombre'], $_POST['descripcion'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $usuario_id = $_SESSION['usuario_id'];

    $sql = "INSERT INTO especialidades (nombre, descripcion, usuario_id) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nombre, $descripcion, $usuario_id);
    $stmt->execute();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Especialidades</title>
</head>
<body>
    <h2>Bienvenido, <?php echo $_SESSION['usuario_nombre']; ?>!</h2>
    <a href="logout.php">Cerrar sesión</a>

    <h3>Registrar nueva especialidad</h3>
    <form method="post">
        Nombre: <input type="text" name="nombre" required><br><br>
        Descripción:<br>
        <textarea name="descripcion" required></textarea><br><br>
        <input type="submit" value="Guardar">
    </form>

    <h3>Listado de especialidades</h3>
    <ul>
        <?php
        $sql = "SELECT e.nombre, e.descripcion, u.nombre as usuario 
                FROM especialidades e
                LEFT JOIN usuarios u ON e.usuario_id = u.id
                ORDER BY e.id DESC";
        $result = $conn->query($sql);

        while ($row = $result->fetch_assoc()) {
            echo "<li><b>".$row['nombre']."</b>: ".$row['descripcion'].
                 " <i>(registrada por ".$row['usuario'].")</i></li>";
        }
        ?>
    </ul>
</body>
</html>
