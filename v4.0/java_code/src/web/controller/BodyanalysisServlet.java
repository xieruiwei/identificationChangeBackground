package web.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ToolChangeBackground.Bodyanalysis;

/**
 * Servlet implementation class BodyanalysisServlet
 */
@WebServlet("/BodyanalysisServlet")
public class BodyanalysisServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BodyanalysisServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        //�����������
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        /* ������Ӧͷ����ajax������� */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* �Ǻű�ʾ���е��������󶼿��Խ��ܣ� */
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        
        
		String path = request.getParameter("path");
		int beginIndex = path.lastIndexOf("/");
		String pictureName = path.substring(beginIndex);
		path = path.substring(0,beginIndex+1);
		String srcPath = this.getServletContext().getRealPath("/upload")+path;
		String savePath = this.getServletContext().getRealPath("/bodyanalysisPath")+path;

		Bodyanalysis bodyanalysis = new Bodyanalysis();
		//���񱳾��ָ�
		bodyanalysis.convert(srcPath, savePath, pictureName+".png");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
