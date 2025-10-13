#!python
# -*- coding: utf-8 -*-

import mysql.connector
from mysql.connector import Error
import sys
import os

# Configurar salida para Windows
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

# Configuración de la base de datos
DB_CONFIG = {
    'host': 'localhost',
    'port': 3307,
    'user': 'root',
    'password': '',
    'database': 'mi_base_datos',
    'charset': 'utf8mb4'
}

def conectar_db():
    """Establece conexión con la base de datos MySQL"""
    try:
        conexion = mysql.connector.connect(**DB_CONFIG)
        if conexion.is_connected():
            return conexion
    except Error as e:
        # NO hacer print aquí, solo retornar None
        # El error se manejará en la función principal
        return None

def obtener_usuarios():
    """Obtiene la lista de nombres y emails de la base de datos"""
    conexion = conectar_db()
    usuarios = []
    error_msg = None
    
    if conexion:
        try:
            cursor = conexion.cursor()
            query = "SELECT nombre, email FROM usuarios ORDER BY nombre"
            cursor.execute(query)
            usuarios = cursor.fetchall()
            
        except Error as e:
            # Guardar el error para manejarlo después
            error_msg = f"Error al ejecutar consulta: {e}"
            
        finally:
            cursor.close()
            conexion.close()
    else:
        error_msg = "No se pudo conectar con la base de datos MySQL"
    
    return usuarios, error_msg

def generar_html(usuarios, error_msg=None):
    """Genera el HTML con la lista de usuarios"""
    
    # IMPORTANTE: En CGI, primero se debe imprimir el header Content-Type
    print("Content-Type: text/html; charset=utf-8")
    print("")  # Línea vacía obligatoria después del header
    
    html = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Usuarios</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .no-data {
            text-align: center;
            color: #666;
            font-style: italic;
            margin-top: 30px;
        }
        .error {
            color: #d32f2f;
            background-color: #ffebee;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .total {
            margin-top: 20px;
            font-weight: bold;
            color: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Lista de Usuarios Registrados</h1>
"""
    
    if error_msg:
        html += f"""
        <div class="error">
            <h3>Error de Base de Datos</h3>
            <p>{error_msg}</p>
        </div>
"""
    
    if usuarios and not error_msg:
        html += f"""
        <div class="total">Total de usuarios: {len(usuarios)}</div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
"""
        for nombre, email in usuarios:
            nombre = str(nombre).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            email = str(email).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            
            html += f"""
                <tr>
                    <td>{nombre}</td>
                    <td>{email}</td>
                </tr>
"""
        html += """
            </tbody>
        </table>
"""
    else:
        html += """
        <div class="no-data">
            <p>No se encontraron usuarios en la base de datos.</p>
            <p>Verifique la conexión y que la tabla 'usuarios' contenga datos.</p>
        </div>
"""
    
    html += """
        <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
            Generado automáticamente por script CGI Python
        </div>
    </div>
</body>
</html>
"""
    
    print(html)

def main():
    """Función principal del script CGI"""
    try:
        usuarios, error_msg = obtener_usuarios()
        
        generar_html(usuarios, error_msg)
        
    except Exception as e:
        print("Content-Type: text/html; charset=utf-8")
        print("")
        
        print(f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error - Lista de Usuarios</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 50px; }}
        .error {{ color: #d32f2f; background-color: #ffebee; padding: 20px; border-radius: 4px; }}
    </style>
</head>
<body>
    <div class="error">
        <h2>Error crítico en el script</h2>
        <p>Se ha producido un error inesperado.</p>
        <p><strong>Detalle del error:</strong> {str(e)}</p>
        <p><strong>Tipo de error:</strong> {type(e).__name__}</p>
        <p>Por favor, contacte al administrador del sistema.</p>
    </div>
</body>
</html>
""")

if __name__ == '__main__':
    main()