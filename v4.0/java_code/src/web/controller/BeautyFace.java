package web.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ToolChangeBackground.BeautyFaceCommand;
import ToolChangeBackground.BeautyToBodyanalysis;
import ToolChangeBackground.Bodyanalysis;

/**
 * Servlet implementation class BeautyFace
 */
@WebServlet("/BeautyFace")
public class BeautyFace extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BeautyFace() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	 	request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        /* ������Ӧͷ����ajax������� */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* �Ǻű�ʾ���е��������󶼿��Խ��ܣ� */
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");

		String path = request.getParameter("path");
		
        //����ͼƬ
        BeautyFaceCommand beautyFaceCommand = new BeautyFaceCommand();
        beautyFaceCommand.imgToBeauty(path);
        System.out.println(path);
        //���񱳾��ָ�
        String bodyanalysisPath = this.getServletContext().getRealPath("/bodyanalysisPath")+path+".png";
		String savePath = this.getServletContext().getRealPath("/beauty")+path+".png";
		BeautyToBodyanalysis beautyToBodyanalysis = new BeautyToBodyanalysis();
		beautyToBodyanalysis.setAlpha(bodyanalysisPath,savePath);
        
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
