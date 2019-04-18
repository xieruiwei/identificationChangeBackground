package ToolChangeBackground;

import java.io.InputStreamReader;
import java.io.LineNumberReader;

import web.controller.test;

public class BeautyFaceCommand {
	public int imgToBeauty(String path){
		String command = "python /usr/java/tomcat/webapps/identificationChangeBackground/beautifyFace.py "
						 +path; 
		try
		{
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
