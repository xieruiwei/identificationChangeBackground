package web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.ProgressListener;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONObject;

import ToolChangeBackground.Bodyanalysis;
import ToolChangeBackground.FaceRecognize;

/**
 * Servlet implementation class UploadImage
 */
@WebServlet("/UploadImage")
public class UploadImage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadImage() {
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
		
        System.out.println("上传图片。。。");
        
		String data = getData();
		String time = getTime();
		System.out.println("日期为："+data);
		System.out.println("时间为："+time);
		String saveFileName = time + ".png";
		String savePath = this.getServletContext().getRealPath("/upload")+data;
		String bodyanalysisPath = this.getServletContext().getRealPath("/bodyanalysisPath")+data;
		String download = this.getServletContext().getRealPath("/download")+data;
		String beauty = this.getServletContext().getRealPath("/beauty")+data;
		String targetName = "一寸";
		int targetWidth = 260;
		int targetHeight = 340;
		
		try{
			DiskFileItemFactory factory = new DiskFileItemFactory();  //10k
			factory.setSizeThreshold(1024*1024*5);
			factory.setRepository(new File(this.getServletContext().getRealPath("/temp")));
			
			ServletFileUpload upload = new ServletFileUpload(factory);
//			upload.setProgressListener(new ProgressListener(){
//				public void update(long pBytesRead, long pContentLength, int pItems) {
//					System.out.println("当前已解析：" + pBytesRead);
//				}
//			});
			
			upload.setFileSizeMax(1024*1024*5);
			if(!upload.isMultipartContent(request)){
				//按照传统方式获取表单数据
				request.getParameter("username");
				return;
			}
			upload.setHeaderEncoding("UTF-8");
			List<FileItem> list = upload.parseRequest(request);
			
			for(FileItem item : list){
				if(item.isFormField()){
					//为普通输入项
					String inputName = item.getFieldName();
					String inputValue = item.getString("utf-8");
					if(inputName.equals("targetName")){
						targetName = inputValue;
					}
					if(inputName.equals("targetWidth")){
						targetWidth = Integer.parseInt(inputValue);
					}
					if(inputName.equals("targetHeight")){
						targetHeight = Integer.parseInt(inputValue);
					}
				}else{
					String filename = item.getName().substring(item.getName().lastIndexOf("\\")+1);  //""
					if(filename==null || filename.trim().equals("")){
						continue;
					}
	
					InputStream in = item.getInputStream();
					int len = 0;
					byte buffer[] = new byte[1024];
//					saveFileName = time + ".jpg";
//					savepath = this.getServletContext().getRealPath("/upload")+data;
//					downloadpath = this.getServletContext().getRealPath("/download")+data;
					File file1 = new File(savePath);
					File file2 = new File(bodyanalysisPath);
					File file3 = new File(download);
					File file4 = new File(beauty);
					if(!file1.exists()){
						file1.mkdirs();
					}
					if(!file2.exists()){
						file2.mkdirs();
					}
					if(!file3.exists()){
						file3.mkdirs();
					}
					if(!file4.exists()){
						file4.mkdirs();
					}
					System.out.println(savePath + saveFileName);
					FileOutputStream out = new FileOutputStream(savePath + saveFileName);
					while((len=in.read(buffer))>0){
						out.write(buffer, 0, len);
					}
					in.close();
					out.close();
					item.delete();  //删除临时文件
				}
			}
		}catch (FileUploadBase.FileSizeLimitExceededException e) {
			request.setAttribute("message", "文件大小不能超过5m");
			return;
		}catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		//分析图片里面的人脸是否符合规范
		FaceRecognize faceRecognize = new FaceRecognize();
		String getInfor = faceRecognize.GetFaceRecognize(savePath+saveFileName);  //获取分析结果  如果符合则返回  OK_dealPath;

		JSONObject jsonObject = new JSONObject();
	    jsonObject.put("dealResult",getInfor);
	    jsonObject.put("path",data+time);
	    PrintWriter out = response.getWriter();
	    out.println(jsonObject);
		out.flush();
		return ;
//		else{
//			// 操作图像  人像抠图
//		    System.out.println(targetName+"***"+targetWidth+"******"+targetHeight);
//		    Bodyanalysis bodyanalysis = new Bodyanalysis();
//			int lostHeight = bodyanalysis.convert(savePath,bodyanalysisPath,saveFileName,targetWidth, targetHeight);
//			
//			JSONObject jsonObject = new JSONObject();
//	        jsonObject.put("path",data+time);
//	        jsonObject.put("lostHeight", lostHeight);
//	        PrintWriter out = response.getWriter();
//	        out.println(jsonObject);
//		    out.flush();
//		}

	    
	   
	}
	
	  //获取当前日期的字符串   并且返回存储路径格式      .2018.07.25
  	public String getData() {
		Calendar calendar = Calendar.getInstance();
		String  year = calendar.get(Calendar.YEAR) + "";
		String month = calendar.get(Calendar.MONTH) + 1 + "";
		String new_data = calendar.get(Calendar.DATE) + "";
		if(Integer.parseInt(month)<10)
			month = "0" + month;
		if(Integer.parseInt(new_data)<10)
			new_data = "0" + new_data;
		
		//return File.separator + year + File.separator + month + File.separator + new_data + "";
		return "/" + year + "/" + month + "/" + new_data + "";
	}
	
	//获取当前时间的字符串   并且返回存储路径格式      .71725   七点十七分25秒
	public String getTime(){
		Date date=new Date();
		String hour = date.getHours() + "";
		String mimute = date.getMinutes() + "";
		String second = date.getSeconds() + "";
	//	return File.separator + hour + mimute + second;
		return "/" + hour + mimute + second;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
