#!python
# -*- coding: utf-8 -*-

import sys
import os
import urllib.parse
from html import escape

# Configurar salida para Windows
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

def parse_form_data():
    """Parse form data from POST or GET request"""
    form_data = {}
    
    # Obtener método de solicitud
    request_method = os.environ.get('REQUEST_METHOD', 'GET')
    
    if request_method == 'POST':
        # Leer datos POST del stdin
        content_length = int(os.environ.get('CONTENT_LENGTH', 0))
        if content_length > 0:
            post_data = sys.stdin.read(content_length)
            # Parsear datos URL-encoded
            parsed_data = urllib.parse.parse_qs(post_data)
            for key, value_list in parsed_data.items():
                form_data[key] = value_list[0] if value_list else ''
    
    elif request_method == 'GET':
        # Obtener datos de la query string
        query_string = os.environ.get('QUERY_STRING', '')
        if query_string:
            parsed_data = urllib.parse.parse_qs(query_string)
            for key, value_list in parsed_data.items():
                form_data[key] = value_list[0] if value_list else ''
    
    return form_data, request_method

def compare_passwords(password1, password2):
    """Comparar las contraseñas y retornar resultado"""
    if not password1 and not password2:
        return "warning", "⚠️ No se proporcionaron contraseñas"
    elif not password1:
        return "error", "❌ Falta la contraseña principal"
    elif not password2:
        return "error", "❌ Falta confirmar la contraseña"
    elif password1 == password2:
        return "success", "✅ Las contraseñas coinciden"
    else:
        return "error", "❌ Las contraseñas no coinciden"

def get_server_variables():
    """Obtener variables importantes del servidor"""
    important_vars = [
        'SERVER_SOFTWARE', 'SERVER_NAME', 'SERVER_PORT', 'SERVER_PROTOCOL',
        'REQUEST_METHOD', 'REQUEST_URI', 'SCRIPT_NAME', 'QUERY_STRING',
        'CONTENT_TYPE', 'CONTENT_LENGTH', 'HTTP_HOST', 'HTTP_USER_AGENT',
        'HTTP_ACCEPT', 'HTTP_ACCEPT_LANGUAGE', 'HTTP_ACCEPT_ENCODING',
        'HTTP_CONNECTION', 'REMOTE_ADDR', 'REMOTE_HOST', 'REMOTE_PORT',
        'DOCUMENT_ROOT', 'SCRIPT_FILENAME', 'PATH_INFO', 'PATH_TRANSLATED'
    ]
    
    server_vars = {}
    for var in important_vars:
        server_vars[var] = os.environ.get(var, 'No definida')
    
    return server_vars

def main():
    """Función principal del procesador CGI"""
    try:
        # Procesar datos del formulario
        form_data, method = parse_form_data()
        
        # Comparar contraseñas
        password1 = form_data.get('password', '')
        password2 = form_data.get('repetir_password', '')
        pass_status, pass_message = compare_passwords(password1, password2)
        
        # Obtener variables del servidor
        server_vars = get_server_variables()
        
        # Generar respuesta HTML
        print("Content-Type: text/html; charset=utf-8")
        print("")
        
        print(f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Procesador de Formulario CGI</title>
</head>
<body>
    <h1>Procesador de Formulario CGI</h1>
    
    <h2>Método de Solicitud: {method}</h2>
    <p>Los datos fueron enviados usando el método <strong>{method}</strong>.</p>
""")
        
        # Mostrar datos del formulario
        print('<h2>Datos del Formulario</h2>')
        
        if form_data:
            # Mapear nombres de campos a etiquetas legibles
            field_labels = {
                'nombre': 'Nombre',
                'apellido': 'Apellido', 
                'email': 'Email',
                'password': 'Password',
                'repetir_password': 'Repetir Password'
            }
            
            for key, value in form_data.items():
                label = field_labels.get(key, key.title())
                # Ocultar contraseñas por seguridad
                if 'password' in key.lower():
                    display_value = '•' * len(value) if value else '(vacío)'
                else:
                    display_value = escape(value) if value else '(vacío)'
                
                print(f'<p><strong>{label}:</strong> {display_value}</p>')
        else:
            print('<p>No se recibieron datos del formulario</p>')
        
        # Mostrar comparación de contraseñas
        print('<h2>Comparación de Contraseñas</h2>')
        if pass_status == 'success':
            print(f'<p style="color: green;"><strong>{pass_message}</strong></p>')
        elif pass_status == 'error':
            print(f'<p style="color: red;"><strong>{pass_message}</strong></p>')
        else:
            print(f'<p style="color: orange;"><strong>{pass_message}</strong></p>')
        
        # Mostrar variables del servidor
        print('<h2>Variables de Ambiente del Servidor</h2>')
        print('<table border="1" cellpadding="5" cellspacing="0">')
        print('<tr><th>Variable</th><th>Valor</th></tr>')
        
        for var, value in server_vars.items():
            if value != 'No definida':
                value = escape(str(value))
            else:
                value = '<em>No definida</em>'
            
            print(f'<tr><td><strong>{var}</strong></td><td>{value}</td></tr>')
        
        print('</table>')
        print('<hr>')
        print('<p><em>Procesado por CGI Python</em></p>')
        print('</body>')
        print('</html>')
        
    except Exception as e:
        print("Content-Type: text/html; charset=utf-8")
        print("")
        print(f'''<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Error - Procesador CGI</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 50px; background: #f8f9fa; }}
        .error {{ 
            background: #fed7d7; 
            color: #742a2a; 
            padding: 25px; 
            border-radius: 8px; 
            border: 2px solid #fc8181;
            max-width: 600px;
            margin: 0 auto;
        }}
    </style>
</head>
<body>
    <div class="error">
        <h2>❌ Error en el Procesador CGI</h2>
        <p><strong>Error:</strong> {escape(str(e))}</p>
        <p><strong>Tipo:</strong> {type(e).__name__}</p>
        <p>Por favor, contacte al administrador del sistema.</p>
    </div>
</body>
</html>
        ''')

if __name__ == '__main__':
    main()