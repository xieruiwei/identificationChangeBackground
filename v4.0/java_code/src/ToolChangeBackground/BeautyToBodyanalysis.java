package ToolChangeBackground;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

public class BeautyToBodyanalysis {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BeautyToBodyanalysis beautyToBodyanalysis = new BeautyToBodyanalysis();
		beautyToBodyanalysis.setAlpha("C:\\Users\\96998\\Desktop\\1.png",
									  "C:\\Users\\96998\\Desktop\\r1.png");

	}
	//String path = "C:\\Users\\96998\\Desktop\\3.png";  �����ָ�ͼƬ
	//String path1 = "C:\\Users\\96998\\Desktop\\3.png"; ����ͼƬ
    public void setAlpha(String path,String path1) {
        /**
         * 
         * ��ȡͼƬ���޸�����,ȥ���߽� ���⻬��
         */
        try {
        	
        //�������ָ��ͼƬ
          ImageIcon imageIcon = new ImageIcon(path);
          BufferedImage bufferedImage = new BufferedImage(imageIcon.getIconWidth(),imageIcon.getIconHeight()
              , BufferedImage.TYPE_4BYTE_ABGR);
          Graphics2D g2D = (Graphics2D) bufferedImage.getGraphics();
          g2D.drawImage(imageIcon.getImage(), 0, 0,
                               imageIcon.getImageObserver());
          
        //���Ѿ����յ�ͼƬ
          ImageIcon imageIcon1 = new ImageIcon(path1);
          BufferedImage bufferedImage1 = new BufferedImage(imageIcon1.getIconWidth(),imageIcon1.getIconHeight()
              , BufferedImage.TYPE_4BYTE_ABGR);
          Graphics2D g2D1 = (Graphics2D) bufferedImage1.getGraphics();
          g2D1.drawImage(imageIcon1.getImage(), 0, 0, imageIcon1.getImageObserver());
          
          
          //ѭ��ÿһ�����ص�
          for (int j1 = bufferedImage.getMinY(); j1 < bufferedImage.getHeight(); j1++) {
            for (int j2 = bufferedImage.getMinX(); j2 < bufferedImage.getWidth(); j2++) {
              int pixel = bufferedImage.getRGB(j2, j1);
              int pixel1 = bufferedImage1.getRGB(j2, j1);
              
              int rgb = (pixel & 0xff000000) >> 24;  //��ȡ�����ָ��  alphaֵ  �õ�����Ϊ͸���ĵ�
              if(rgb==0){
            	  pixel1 = 0x00000000;  //���� alpha   �����պ�ķ�����������Ϊ͸��
              }
              bufferedImage1.setRGB(j2, j1, pixel1);  //�����պ�ķ�����������Ϊ͸��
            }
          }
          g2D.drawImage(bufferedImage, 0, 0, imageIcon.getImageObserver());
          g2D.drawImage(bufferedImage1, 0, 0, imageIcon1.getImageObserver());
          //����ͼƬΪPNG
          ImageIO.write(bufferedImage1, "png",  new File(path1));
        }
        catch (Exception e) {
          e.printStackTrace();
        }
      }
}
