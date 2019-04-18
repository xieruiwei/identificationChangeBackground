package ToolChangeBackground;

import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

public class WaterImage {
	public int getWaterImage(String srcPath,String waterPath,String savePath,int tw,int th){
		try {
			Thumbnails.of(waterPath).size(tw, th).watermark(Positions.BOTTOM_RIGHT,
					ImageIO.read(new File(srcPath)), 1.0f).outputQuality(1.0f).toFile(savePath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 1;
	}
}
