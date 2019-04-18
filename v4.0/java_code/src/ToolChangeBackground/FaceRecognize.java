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
	//����APPID/AK/SK
    public static final String APP_ID = "15886897";
    public static final String API_KEY = "j38YDGMuDvNYr4bVyFOGXZKE";
    public static final String SECRET_KEY = "iCh3W1H7IKbGVUnrdhU17tkuUYNBYiCB";

    public String GetFaceRecognize(String path){

        // ��ʼ��һ��AipFace
        AipFace client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

        // ��ѡ�������������Ӳ���
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);

//        // ��ѡ�����ô����������ַ, http��socket��ѡһ�����߾�������
//        client.setHttpProxy("proxy_host", proxy_port);  // ����http����
//        client.setSocketProxy("proxy_host", proxy_port);  // ����socket����

//        // ��ѡ������log4j��־�����ʽ���������ã���ʹ��Ĭ������
//        // Ҳ����ֱ��ͨ��jvm�����������ô˻�������
//        System.setProperty("aip.log4j.conf", "path/to/your/log4j.properties");

        // ���ýӿ�
      //  String path = "C:\\Users\\96998\\Desktop\\0.jpg";
        // �����ѡ�������ýӿ�
        HashMap<String, String> options = new HashMap<String, String>(); 
        options.put("max_face_num", "2");
        options.put("face_field", "quality,face_type");

       JSONObject res = client.detect(getImageStr(path), "BASE64", options);
       System.out.println(res.toString(2));    //����������������
       
       //�ж��ϴ���ͼƬ�Ƿ���Ϲ淶   �������򷵻���Ӧ����������
       if((res.get("result")+"").equals("null")){
    	   System.out.println("���ϴ���ȷ�����Ƭ");
    	   return "���ϴ���ȷ�����Ƭ";
       }

       JSONObject face_list = (JSONObject)res.getJSONObject("result").getJSONArray("face_list").get(0);
       
       //������Ŀ
       int faceNum = (int)res.getJSONObject("result").get("face_num");
       if(faceNum!=1){
    	   System.out.println("֤�����ǵ��˵�Ŷ~");
    	   return "֤����ֻ��Ҫ���˵�Ŷ~";
       }
       
       JSONObject quality = (JSONObject)face_list.get("quality");
       //����ģ���̶ȣ���Χ[0~1]��0��ʾ������1��ʾģ��	
       String blur = (String)( quality.get("blur")+"");
       int local = 0;
       if(blur.indexOf(".")!=-1){
    	   local = blur.indexOf(".");
    	   blur = blur.substring(local+1,local+2);
       }
       if(Integer.parseInt(blur)>5){
    	   System.out.println("���ϴ���������Ƭ");
    	   return "���ϴ���������Ƭ";
       }
       //���������ȣ�0��1, 0Ϊ�������ͼ��߽磬1Ϊ��������ͼ��߽���
       int completeness = (int)quality.get("completeness"); 
       if(completeness!=1){
    	   System.out.println("���ϴ��������͵���Ƭ");
    	   return "���ϴ��������͵���Ƭ";
       }
       //������ת�Ƕ�
       JSONObject angle = (JSONObject)face_list.get("angle");
       double roll = (double)angle.get("roll");
       if(Math.abs(roll)>=8){
    	   System.out.println("���ϴ���������Ƭ");
    	   return "���ϴ���������Ƭ";
       }
       System.out.println("faceNum:"+faceNum+"__blur:"+blur
    		   			 +"__completeness:"+completeness+"__roll:"+roll);

       
       //���Ϲ淶��  �ü���������
       JSONObject location = (JSONObject)face_list.get("location");
       String getTop = location.get("top")+"";
       String getLeft = location.get("left")+"";
       String getWidth = location.get("width")+"";
       String getHeight = location.get("height")+"";
       
       
       //��ȡͼƬ�Ŀ��
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
       
       try {							// �����  �����   ��   ��
		Thumbnails.of(path).sourceRegion(left,top,width,height).size(
				width,height).keepAspectRatio(false).toFile(path);
       } catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
       }
       

       return "OK";
           
    }
    
    //ͼƬתΪ  base64
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
        // ����
        BASE64Encoder encoder = new BASE64Encoder();
        return encoder.encode(data);
    }
}
