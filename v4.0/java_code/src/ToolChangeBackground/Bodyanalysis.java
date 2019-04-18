package ToolChangeBackground;
import java.awt.Image;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.HashMap;

import javax.imageio.ImageIO;

import org.json.JSONObject;

import com.baidu.aip.bodyanalysis.AipBodyAnalysis;

public class Bodyanalysis {
	//设置APPID/AK/SK
    public static final String APP_ID = "15699685";
    public static final String API_KEY = "qUZoriLams3NrV2jiAAoQSS4";
    public static final String SECRET_KEY = "FTGmxie1VhXPigSrS48CGq1SGkPPS9NB";
    
    public static void convert(String srcPath,String dealPath,String pictureName) {
		 // 初始化一个AipBodyAnalysis
        AipBodyAnalysis client = new AipBodyAnalysis(APP_ID, API_KEY, SECRET_KEY);

        // 可选：设置网络连接参数
        //    client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);

        // 可选：设置代理服务器地址, http和socket二选一，或者均不设置
        // client.setHttpProxy("proxy_host", proxy_port);  // 设置http代理
        // client.setSocketProxy("proxy_host", proxy_port);  // 设置socket代理
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>();
        options.put("type", "foreground");
        
        
        // 参数为本地路径
        String image = srcPath+pictureName;
        JSONObject res = client.bodySeg(image, options);
   //     System.out.println(res.toString(2));
        
        String labelmapBase64 =(String) res.get("foreground");
    	
        try {
            byte[] bytes = Base64.getDecoder().decode(labelmapBase64);
            InputStream is = new ByteArrayInputStream(bytes);
            BufferedImage image1 = ImageIO.read(is);
            ImageIO.write(image1,"png", new File(dealPath+pictureName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        //去除边界  不光滑  白边等
        WipeBoundary wipeBoundary = new WipeBoundary();
        wipeBoundary.setAlpha(dealPath+pictureName);
        
        return;
    }
}


