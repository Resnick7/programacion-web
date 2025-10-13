package com.ejemplo;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;

public class PrimerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String nombre = req.getParameter("nombre");
        if (nombre == null || nombre.trim().isEmpty()) {
            nombre = "Invitado";
        }

        Usuario user = new Usuario(nombre, 18);
        req.setAttribute("usuario", user);

        RequestDispatcher rd = req.getRequestDispatcher("/SegundoServlet");
        rd.forward(req, resp);
    }
}

