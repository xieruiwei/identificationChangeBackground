package ToolChangeBackground;

import java.io.InputStreamReader;
import java.io.LineNumberReader;

public class ToolChangeBackground {
	public int changeBackground(int x,int y,int z,String image){
		String command = "/usr/jniso/opencvTest/identificationChangeBackground " 
					   + image + " " + x + " " + y + " " + z; 
		try
		{
		 if(command==null)
			 return 0;
		 Process process = Runtime.getRuntime().exec (command);
		 InputStreamReader ir=new InputStreamReader(process.getInputStream());
		 LineNumberReader input = new LineNumberReader (ir);
		 String line;
			 while ((line = input.readLine ()) != null){
			  System.out.println(line);
			 }
		}
		catch (java.io.IOException e){
		 System.err.println ("IOException " + e.getMessage());
		} 
		return 0;
	}

}
