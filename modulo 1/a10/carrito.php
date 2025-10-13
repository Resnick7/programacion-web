<?php
session_start();

if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $accion = $_POST['accion'];

    if ($accion == "agregar" && isset($_POST['id'])) {
        $id = intval($_POST['id']);
        if (!isset($_SESSION['carrito'][$id])) {
            $_SESSION['carrito'][$id] = 0;
        }
        $_SESSION['carrito'][$id]++;
    }

    if ($accion == "vaciar") {
        $_SESSION['carrito'] = [];
    }
}

header("Location: index.php");
exit;
