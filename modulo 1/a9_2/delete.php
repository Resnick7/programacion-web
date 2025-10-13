<?php
include "conexion.php";

$nombre = "Admin";
$email = "admin@clinica.com";
$password = password_hash("1234", PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre, $email, $password);
$stmt->execute();

echo "Usuario creado.";
