<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "clinica_db";

$conn = new mysqli($host, $user, $pass, $db, 3307);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
