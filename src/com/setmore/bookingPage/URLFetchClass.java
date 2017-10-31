package com.setmore.bookingPage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.fasterxml.jackson.core.type.TypeReference;


public class URLFetchClass {

 
     // String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
     // String saffUrl = "https://developer.setmore.com/api/v1/bookingapi/staffs";
      
     
           Map<String,String> hashmap = new HashMap<String,String>();           
           ObjectMapper objectmapper      = new ObjectMapper();
           
	
           public String getAccessToken() throws IOException, JSONException{
        	   
        	   String companykey = "be4b831b-f68f-471b-adbf-140feebf8cec";
        	
        	   URL obj = new URL("https://developer.setmore.com/api/v1/admin/contact/" + companykey);
        	   HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        	   con.setRequestMethod("GET");
        	   con.setRequestProperty("Content-Type", "application/json");
        	 
        	 
        	   BufferedReader in = new BufferedReader(
        	   new InputStreamReader(con.getInputStream()));
        	   String inputLine;
        	   String response = "";

        	   while ((inputLine = in.readLine()) != null) {
        	   response +=inputLine;
        	   }
        	   in.close();
        	 
        	    TypeReference<HashMap<String,Object>> typeRef 
        	            = new TypeReference<HashMap<String,Object>>() {};

        	    HashMap<String,Object> hashmap = objectmapper.readValue(response, typeRef); 
        	 
        	    String accessToken = "";
        	   
        	    for(Map.Entry<String, Object> entry : hashmap.entrySet()){
        	    	String key = entry.getKey();
        	    	if(key.equals("data")){
        	    	     	    		
        	    		Map<String,Object> data = (Map<String, Object>) entry.getValue();
        	    	    		System.out.println(data);
        	    		   for(Map.Entry<String, Object> accesstoken : data.entrySet()){
        	    			
        	    			   if( accesstoken.getKey().equals("access_token")){
        	    				  accessToken =  (String) accesstoken.getValue();
        	    			   }
        	    			
        	    		}
        	    		
        	    	}        	    	
        	    }
        	   System.out.println("accessToken " + accessToken);
        	   return accessToken;      	  
        	   
           }

	public String fetchDetails(String url, String Token) throws Exception {
		
		
		String response="";
		
		System.out.println("the value of token inseide the get service " + Token);
		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		
		con.setRequestMethod("GET");		
        con.setRequestProperty("Content-Type", "application/json");	 
        con.setRequestProperty("Authorization", "BEARER "+Token);
		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;

		while ((inputLine = in.readLine()) != null) {
			response += inputLine;
		
		System.out.println("response is " + response);
			
		}
			
		return response;

	}
	
}
