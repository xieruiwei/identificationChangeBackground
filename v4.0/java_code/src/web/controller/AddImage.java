package web.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.ImageIcon;

import org.json.JSONObject;

import ToolChangeBackground.WaterImage;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

/**
 * Servlet implementation class AddImage
 */
@WebServlet("/AddImage")
public class AddImage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddImage() {
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
        /* 设置响应头允许ajax跨域访问 */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* 星号表示所有的异域请求都可以接受， */
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        
        String backgroundColor_red = request.getParameter("backgroundColor_red");
        String backgroundColor_green = request.getParameter("backgroundColor_green");
        String backgroundColor_blue = request.getParameter("backgroundColor_blue");
        String targetWidth= request.getParameter("targetWidth");
        String targetHeight = request.getParameter("targetHeight");
        String path = request.getParameter("path");
        String beautyFace_have = request.getParameter("beautyFace_have");

        int red = Integer.parseInt(backgroundColor_red);
        int green = Integer.parseInt(backgroundColor_green);
        int blue = Integer.parseInt(backgroundColor_blue);
        int tw = Integer.parseInt(targetWidth);
        int th = Integer.parseInt(targetHeight);
        
        String waterFilePath = this.getServletContext().getRealPath("/backgroundColors"+"/"+red+green+blue+targetWidth+targetHeight+".jpg");
        String saveFilePath = this.getServletContext().getRealPath("/download"+path+".png");
        String temp = this.getServletContext().getRealPath("/download"+path);
        String sourceFilePath = this.getServletContext().getRealPath("/bodyanalysisPath"+path+".png");
        if(beautyFace_have.equals("1")){
        	sourceFilePath = this.getServletContext().getRealPath("/beauty"+path+".png");
        }
//        System.out.println(backgroundColor);
//        System.out.println(targetWidth);
//        System.out.println(targetHeight);
        //切割 缩放图片到指定大小
		ImageIcon imageIcon = new ImageIcon(sourceFilePath);
	    int iconWidth = imageIcon.getIconWidth();
	    int iconHeight = imageIcon.getIconHeight();
	    
		try {
			Thumbnails.of(sourceFilePath).size(tw, th*iconHeight/iconWidth).toFile(temp+"ko.png");
			imageIcon = new ImageIcon(temp+"ko.png");
		    iconWidth = imageIcon.getIconWidth();
		    iconHeight = imageIcon.getIconHeight();
			if(tw>th){
				th = iconHeight;
			}
			Thumbnails.of(temp+"ko.png").sourceRegion(0,0,tw,th)
	   					.size(tw,th).keepAspectRatio(false).toFile(temp+"koko.png");
			} catch (IOException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		} 
		
		WaterImage waterImage = new WaterImage();
		waterImage.getWaterImage(temp+"koko.png", waterFilePath, saveFilePath, tw, th);
		
        String downloadPath = "download"+path+".png";
		JSONObject jsonObject = new JSONObject();
        jsonObject.put("downloadPath",downloadPath);
        PrintWriter out = response.getWriter();
        out.println(jsonObject);
	    out.flush();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
