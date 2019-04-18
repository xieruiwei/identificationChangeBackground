package web.controller;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class test {
	//String path = "C:\\Users\\96998\\Desktop\\3.png";
    public void setAlpha(String path) {
        /**
         * ���Ӳ�����
         * ��ȡͼƬ�����Ƴɰ�͸��,�޸�����
         */
        try {
          ImageIcon imageIcon = new ImageIcon(path);
          BufferedImage bufferedImage = new BufferedImage(imageIcon.getIconWidth(),imageIcon.getIconHeight()
              , BufferedImage.TYPE_4BYTE_ABGR);
          Graphics2D g2D = (Graphics2D) bufferedImage.getGraphics();
          g2D.drawImage(imageIcon.getImage(), 0, 0,
                               imageIcon.getImageObserver());
          //ѭ��ÿһ�����ص㣬�ı����ص��Alphaֵ  0~255  ��͸������͸��
          int alpha = 255;
          int index = 0;
          for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
            for (int j2 = bufferedImage.getMinX(); j2 < bufferedImage.getWidth(); j2++) {
              int pixel = bufferedImage.getRGB(j2, j1);
//              System.out.println(pixel);
//              Thread.sleep(1000);
              int[]   rgb = new int[4];
              rgb[0] = (pixel & 0xff000000) >> 24;
              rgb[1] = (pixel & 0xff0000) >> 16;
              rgb[2] = (pixel & 0xff00) >> 8;
              rgb[3] = (pixel & 0xff);
//              System.out.println("i=" + j1 + ",j=" + j2 + ":(" + rgb[0] + ","
//                      + rgb[1] + "," + rgb[2] + "," + rgb[3] + ")");
              if(rgb[0]!=-1){
//            	  index++;
            	  pixel = 0x00000000;  //���� alpha
//                  pixel = (255 << 24) | 0x00000000;  //���� alpha
//                  pixel = (255 << 16) | pixel;		 //���� red
//                  pixel = (0 << 8)  | pixel;		 //���� green
//                  pixel = (0)       | pixel;		 //���� blue
              }
//              if(index==15)
//            	  index=0;
              bufferedImage.setRGB(j2, j1, pixel);
            }
          }
          g2D.drawImage(bufferedImage, 0, 0, imageIcon.getImageObserver());

          //����ͼƬΪPNG
          ImageIO.write(bufferedImage, "png",  new File("C:\\Users\\96998\\Desktop\\yy.jpg"));
        }
        catch (Exception e) {
          e.printStackTrace();
        }
      }
    public static void main(String[] args) throws Exception {
	    int x = 0;
	    test rc = new test();
	    rc.setAlpha("C:\\Users\\96998\\Desktop\\1.png");
    }


        


}
