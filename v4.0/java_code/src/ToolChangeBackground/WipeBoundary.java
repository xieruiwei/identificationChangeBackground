package ToolChangeBackground;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class WipeBoundary {
	//String path = "C:\\Users\\96998\\Desktop\\3.png";
    public void setAlpha(String path) {
        /**
         * 
         * 读取图片，修改像素,去除边界 不光滑点
         */
        try {
          ImageIcon imageIcon = new ImageIcon(path);
          BufferedImage bufferedImage = new BufferedImage(imageIcon.getIconWidth(),imageIcon.getIconHeight()
              , BufferedImage.TYPE_4BYTE_ABGR);
          Graphics2D g2D = (Graphics2D) bufferedImage.getGraphics();
          g2D.drawImage(imageIcon.getImage(), 0, 0,
                               imageIcon.getImageObserver());
          //循环每一个像素点，改变像素点的Alpha值  0~255  从透明到不透明
          int alpha = 255;
          for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
            for (int j2 = bufferedImage.getMinX(); j2 < bufferedImage.getWidth(); j2++) {
              int pixel = bufferedImage.getRGB(j2, j1);
              	
              int[]   rgb = new int[4];
              rgb[0] = (pixel & 0xff000000) >> 24;
//              rgb[1] = (pixel & 0xff0000) >> 16;
//              rgb[2] = (pixel & 0xff00) >> 8;
//              rgb[3] = (pixel & 0xff);
//              System.out.println("i=" + j1 + ",j=" + j2 + ":(" + rgb[0] + ","
//                      + rgb[1] + "," + rgb[2] + "," + rgb[3] + ")");
              if(rgb[0]!=-1){
            	  pixel = 0x00000000;  //设置 alpha
//                  pixel = (0 << 24) | 0x00000000;  //设置 alpha
//                  pixel = (255 << 16) | pixel;		 //设置 red
//                  pixel = (0 << 8)  | pixel;		 //设置 green
//                  pixel = (0)       | pixel;		 //设置 blue
              }
              bufferedImage.setRGB(j2, j1, pixel);
            }
          }
          
          
          //从上往下遍历  把像素点往下压  5个像素点
          fromUpDeal(bufferedImage);
          //从左往右遍历  把像素点往右压  2个像素点
          fromLeftDeal(bufferedImage);
          //从右往左遍历  把像素点往左压  2个像素点
          fromRightDeal(bufferedImage);
          
          g2D.drawImage(bufferedImage, 0, 0, imageIcon.getImageObserver());

          //生成图片为PNG
          ImageIO.write(bufferedImage, "png",  new File(path));
        }
        catch (Exception e) {
          e.printStackTrace();
        }
      }
    /*//从上往下遍历  把像素点往下压  5个像素点*/
    private void fromUpDeal(BufferedImage bufferedImage){
        int max_index = 3;
        for (int j1 = bufferedImage.getMinX(); j1 < bufferedImage.getWidth(); j1++) {
      	  	int index=0; //像素点深入点计算
            for (int j2 = bufferedImage.getMinY(); j2 < bufferedImage.getHeight(); j2++) {
              int pixel = bufferedImage.getRGB(j1, j2);
              	
              int[]   rgb = new int[4];
              rgb[0] = (pixel & 0xff000000) >> 24;
              if(rgb[0]==-1){
                index++;
                if(index>max_index){
              	  pixel = 0x00000000;  //设置 alpha
              	  for(int i=j2-max_index;i<j2;i++)
              		  bufferedImage.setRGB(j1, i, pixel);
              	  break;
                } 
              } 
            }
        }
    }
    //从左往右遍历  把像素点往右压  2个像素点
    private void fromLeftDeal(BufferedImage bufferedImage){
        int max_index =1;
        for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
      	  	int index=0; //像素点深入点计算
            for (int j2 = bufferedImage.getMinX(); j2 < bufferedImage.getWidth(); j2++) {
              int pixel = bufferedImage.getRGB(j2, j1);
              	
              int[]   rgb = new int[4];
              rgb[0] = (pixel & 0xff000000) >> 24;
            
              //判断是否已经到达身体
              if(j2==bufferedImage.getMinX() && rgb[0]==-1)
            	  break;
            
            //否则压进
              if(rgb[0]==-1){
                index++;
                if(index>max_index){
              	  pixel = 0x00000000;  //设置 alpha
              	  for(int i=j2-max_index;i<j2;i++)
              		  bufferedImage.setRGB(i, j1, pixel);
              	  break;
                } 
              } 
            }
        }
    }
    //从右往左遍历  把像素点往左压  2个像素点
    private void fromRightDeal(BufferedImage bufferedImage){
        int max_index =1;
        for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
      	  int index=0; //像素点深入点计算
            for (int j2 = bufferedImage.getWidth()-1; j2 >= bufferedImage.getMinX(); j2--) {
              int pixel = bufferedImage.getRGB(j2, j1);
              	
              int[]   rgb = new int[4];
              rgb[0] = (pixel & 0xff000000) >> 24;
              	  
              //判断是否已经到达身体
              if(j2==bufferedImage.getWidth()-1 && rgb[0]==-1)
                 break;
                
              //否则压进
              if(rgb[0]==-1){
                index++;
                if(index>max_index){
              	  pixel = 0x00000000;  //设置 alpha
              	  for(int i=j2+max_index;i>j2;i--)
              		  bufferedImage.setRGB(i, j1, pixel);
              	  break;
                } 
              } 
            }
        }
    }
}
