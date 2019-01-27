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
		
		String data = getData();
		String time = getTime();
		System.out.println("日期为："+data);
		System.out.println("时间为："+time);
        List types = Arrays.asList("jpg","gif","avi","txt");
		
		try{
			DiskFileItemFactory factory = new DiskFileItemFactory();  //10k
			factory.setSizeThreshold(1024*1024);
			factory.setRepository(new File(this.getServletContext().getRealPath("/temp")));
			
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setProgressListener(new ProgressListener(){
				public void update(long pBytesRead, long pContentLength, int pItems) {
					System.out.println("当前已解析：" + pBytesRead);
				}
			});
			
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
					String inputValue = item.getString("UTF-8");
					//inputValue = new String(inputValue.getBytes("iso8859-1"),"UTF-8");
					System.out.println(inputName + "="  + inputValue);
				}else{
					String filename = item.getName().substring(item.getName().lastIndexOf("\\")+1);  //""
					if(filename==null || filename.trim().equals("")){
						continue;
					}
					
					/*String ext = filename.substring(filename.lastIndexOf(".")+1);
					if(!types.contains(ext)){
						request.setAttribute("message", "本系统不支持" + ext + "这种类型");
						request.getRequestDispatcher("/message.jsp").forward(request, response);
						return;
					}*/
					InputStream in = item.getInputStream();
					int len = 0;
					byte buffer[] = new byte[1024];
					String saveFileName = time + ".jpg";
					String savepath = this.getServletContext().getRealPath("/upload")+data;
					String downloadpath = this.getServletContext().getRealPath("/download")+data;
					File file1 = new File(savepath);
					File file2 = new File(downloadpath);
					if(!file1.exists()){
						file1.mkdirs();
					}
					if(!file2.exists()){
						file2.mkdirs();
					}
					System.out.println(savepath + saveFileName);
					FileOutputStream out = new FileOutputStream(savepath + saveFileName);
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
		
		JSONObject jsonObject = new JSONObject();
        jsonObject.put("path",data+time);
        PrintWriter out = response.getWriter();
        out.println(jsonObject);
	    out.flush();
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
		
		return File.separator + year + File.separator + month + File.separator + new_data + "";
	}
	
	//获取当前时间的字符串   并且返回存储路径格式      .71725   七点十七分25秒
	public String getTime(){
		Date date=new Date();
		String hour = date.getHours() + "";
		String mimute = date.getMinutes() + "";
		String second = date.getSeconds() + "";
		return File.separator + hour + mimute + second;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
