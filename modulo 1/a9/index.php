<?php include "conexion.php"; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Especialidades Clínica</title>
    <script>
        function mostrarDescripcion() {
            let id = document.getElementById("especialidad").value;

            if (id === "") {
                document.getElementById("descripcion").innerHTML = "";
                return;
            }

            let xhr = new XMLHttpRequest();
            xhr.open("GET", "descripcion.php?id=" + id, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    document.getElementById("descripcion").innerHTML = xhr.responseText;
                }
            };
            xhr.send();
        }
    </script>
</head>
<body>
    <h2>Seleccione una especialidad</h2>

    <select id="especialidad" onchange="mostrarDescripcion()">
        <option value="">--Seleccione--</option>
        <?php
        $sql = "SELECT id, nombre FROM especialidades";
        $result = $conn->query($sql);

        while($row = $result->fetch_assoc()) {
            echo "<option value='".$row['id']."'>".$row['nombre']."</option>";
        }
        ?>
    </select>

    <div id="descripcion" style="margin-top:20px; font-weight:bold;"></div>
</body>
</html>
