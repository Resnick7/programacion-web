package com.ejemplo;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class HolaServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>¡Hola desde el Servlet!</h1>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");

        String nombre = req.getParameter("nombre");
        String edadStr = req.getParameter("edad");

        int edad = 0;
        try {
            edad = Integer.parseInt(edadStr);
        } catch (NumberFormatException e) {
            resp.getWriter().println("Edad inválida.");
            return;
        }

        String mensaje = "El usuario " + nombre + " tiene " + edad + " años. " +
                (edad >= 18 ? "Es mayor de edad." : "Es menor de edad.");

        resp.getWriter().println(mensaje);
    }

}
