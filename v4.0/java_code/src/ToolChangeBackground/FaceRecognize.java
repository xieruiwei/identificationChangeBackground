package ToolChangeBackground;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import javax.imageio.ImageIO;
import org.json.JSONObject;
import com.baidu.aip.face.AipFace;
import Bean.FaceInformation;
import net.coobird.thumbnailator.Thumbnails;
import sun.misc.BASE64Encoder;
import web.controller.test;

public class FaceRecognize {
	//设置APPID/AK/SK
    public static final String APP_ID = "15886897";
    public static final String API_KEY = "j38YDGMuDvNYr4bVyFOGXZKE";
    public static final String SECRET_KEY = "iCh3W1H7IKbGVUnrdhU17tkuUYNBYiCB";

    public String GetFaceRecognize(String path){

        // 初始化一个AipFace
        AipFace client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);

//        // 可选：设置代理服务器地址, http和socket二选一，或者均不设置
//        client.setHttpProxy("proxy_host", proxy_port);  // 设置http代理
//        client.setSocketProxy("proxy_host", proxy_port);  // 设置socket代理

//        // 可选：设置log4j日志输出格式，若不设置，则使用默认配置
//        // 也可以直接通过jvm启动参数设置此环境变量
//        System.setProperty("aip.log4j.conf", "path/to/your/log4j.properties");

        // 调用接口
      //  String path = "C:\\Users\\96998\\Desktop\\0.jpg";
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>(); 
        options.put("max_face_num", "2");
        options.put("face_field", "quality,face_type");

       JSONObject res = client.detect(getImageStr(path), "BASE64", options);
       System.out.println(res.toString(2));    //人脸分析所有数据
       
       //判断上传的图片是否符合规范   不符合则返回相应不符合提醒
       if((res.get("result")+"").equals("null")){
    	   System.out.println("请上传正确规格照片");
    	   return "请上传正确规格照片";
       }

       JSONObject face_list = (JSONObject)res.getJSONObject("result").getJSONArray("face_list").get(0);
       
       //人脸数目
       int faceNum = (int)res.getJSONObject("result").get("face_num");
       if(faceNum!=1){
    	   System.out.println("证件照是单人的哦~");
    	   return "证件照只需要单人的哦~";
       }
       
       JSONObject quality = (JSONObject)face_list.get("quality");
       //人脸模糊程度，范围[0~1]，0表示清晰，1表示模糊	
       String blur = (String)( quality.get("blur")+"");
       int local = 0;
       if(blur.indexOf(".")!=-1){
    	   local = blur.indexOf(".");
    	   blur = blur.substring(local+1,local+2);
       }
       if(Integer.parseInt(blur)>5){
    	   System.out.println("请上传清晰的照片");
    	   return "请上传清晰的照片";
       }
       //人脸完整度，0或1, 0为人脸溢出图像边界，1为人脸都在图像边界内
       int completeness = (int)quality.get("completeness"); 
       if(completeness!=1){
    	   System.out.println("请上传完整脸型的照片");
    	   return "请上传完整脸型的照片";
       }
       //人脸旋转角度
       JSONObject angle = (JSONObject)face_list.get("angle");
       double roll = (double)angle.get("roll");
       if(Math.abs(roll)>=8){
    	   System.out.println("请上传正脸的照片");
    	   return "请上传正脸的照片";
       }
       System.out.println("faceNum:"+faceNum+"__blur:"+blur
    		   			 +"__completeness:"+completeness+"__roll:"+roll);

       
       //符合规范则  裁剪正脸部分
       JSONObject location = (JSONObject)face_list.get("location");
       String getTop = location.get("top")+"";
       String getLeft = location.get("left")+"";
       String getWidth = location.get("width")+"";
       String getHeight = location.get("height")+"";
       
       
       //获取图片的宽高
       File newfile=new File(path);   
       BufferedImage bufferedimage = null;
       try {
		bufferedimage = ImageIO.read(newfile);
       } catch (IOException e1) {
		// TODO Auto-generated catch block
		e1.printStackTrace();
       }
       int Imgwidth = bufferedimage.getWidth();
       int Imgheight = bufferedimage.getHeight();
       FaceInformation face = new FaceInformation(getTop,getLeft,getWidth,getHeight,Imgwidth,Imgheight);
       int top = face.getTop();
       int left = face.getLeft();
       int width = face.getWidth();
       int height = face.getHeigth();
       
       try {							// 左起点  上起点   宽   高
		Thumbnails.of(path).sourceRegion(left,top,width,height).size(
				width,height).keepAspectRatio(false).toFile(path);
       } catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
       }
       

       return "OK";
           
    }
    
    //图片转为  base64
    public static String getImageStr(String imgFile) {
        InputStream inputStream = null;
        byte[] data = null;
        try {
            inputStream = new FileInputStream(imgFile);
            data = new byte[inputStream.available()];
            inputStream.read(data);
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 加密
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(data);
    }
}
