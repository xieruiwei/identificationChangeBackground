package Bean;

public class FaceInformation {
	private int top;
	private int left;
	private int width;
	private int heigth;
	
	
	//转换成裁剪的规格
	private void changeImage(int ImgWidth,int ImgHeigth){
		int temp = 0;
		top = (top-heigth)>0?(top-heigth):0;
		temp = (int)(left-0.5*width);
		left = temp>0?temp:0;
		heigth = (3*heigth)<ImgHeigth?(3*heigth):ImgHeigth;
		width = (2*width)<ImgWidth?(2*width):ImgWidth;
	}
	//构造函数
	public FaceInformation(String top,String left,String width,String height,int ImgWidth,int ImgHeigth) {
	       int local = 0;
	       if(top.indexOf(".")!=-1){
	    	   local = top.indexOf(".");
		       top = top.substring(0,local);
	       }
	       this.top = Integer.parseInt(top);
	       
	       local = 0;
	       if(left.indexOf(".")!=-1){
	    	   local = left.indexOf(".");
		       left = left.substring(0,local);
	       }
	       this.left = Integer.parseInt(left);
	       this.width = Integer.parseInt(width);
	       this.heigth = Integer.parseInt(height);
	     //转换成裁剪的规格
	       changeImage(ImgWidth, ImgHeigth);
	}
	
	public int getTop() {
		return top;
	}
	public void setTop(int top) {
		this.top = top;
	}
	public int getLeft() {
		return left;
	}
	public void setLeft(int left) {
		this.left = left;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public int getHeigth() {
		return heigth;
	}
	public void setHeigth(int heigth) {
		this.heigth = heigth;
	}

	
	
}
