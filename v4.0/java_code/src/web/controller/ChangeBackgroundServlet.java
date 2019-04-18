package web.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ToolChangeBackground.ToolChangeBackground;

/**
 * Servlet implementation class ChangeBackgroundServlet
 */
@WebServlet("/ChangeBackgroundServlet")
public class ChangeBackgroundServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeBackgroundServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        //设置请求编码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        /* 设置响应头允许ajax跨域访问 */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* 星号表示所有的异域请求都可以接受， */
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        
        
		String image = request.getParameter("image");
		String color1 = request.getParameter("color1");
		String color2 = request.getParameter("color2");
		String color3 = request.getParameter("color3");
		int c1 = Integer.parseInt(color1); 
		int c2 = Integer.parseInt(color2); 
		int c3 = Integer.parseInt(color3); 
		System.out.println(image);
		System.out.println(color1);
		System.out.println(color2);
		System.out.println(color3);
		ToolChangeBackground toolChangeBackground = new ToolChangeBackground();
		toolChangeBackground.changeBackground(c1, c2, c3, image);
	}
//	/usr/java/tomcat/webapps/identificationChangeBackground/WEB-INF/upload/2019/01/23/183647.jpg 55 54 88
//	/usr/java/tomcat/webapps/identificationChangeBackground/WEB-INF/upload/2019/01/23/183647.jpg 55 54 88
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);

		
	}

}
