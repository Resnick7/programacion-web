<?php
include "conexion.php";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT descripcion FROM especialidades WHERE id = $id";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        echo $row['descripcion'];
    } else {
        echo "No se encontró la especialidad.";
    }
}
?>
