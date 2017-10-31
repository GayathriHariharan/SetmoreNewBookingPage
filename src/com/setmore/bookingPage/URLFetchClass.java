package com.setmore.bookingPage;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;


public class URLFetchClass {
	
           Map<String,String> hashmap          = new HashMap<String,String>();           
           ObjectMapper      objectmapper      = new ObjectMapper();
          
           public String getAccessToken(String companyKey) throws Exception{
        	   
        	   URL url                   =  new URL("https://developer.setmore.com/api/v1/admin/contact/" + companyKey);  
        	   String accessToken        = "";
        	   String inputLine;
        	   String response = "";
        	   HttpURLConnection con = (HttpURLConnection)url.openConnection();
        	   con.setRequestMethod("GET");
        	   con.setRequestProperty("Content-Type", "application/json");
    
        	   
       	       BufferedReader in = new BufferedReader(
                	   new InputStreamReader(con.getInputStream()));
       	      
        	   while ((inputLine = in.readLine()) != null) {
            	   response +=inputLine;
            	   }
            	   in.close();
            	   
            	   TypeReference<HashMap<String,Object>> typeRef 
            	   = new TypeReference<HashMap<String,Object>>() {};

            	   HashMap<String,Object> hashmap = objectmapper.readValue(response, typeRef); 

            	      for(Map.Entry<String, Object> entry : hashmap.entrySet()){
           	    	
           	    	String key = entry.getKey();
	           	    	if(key.equals("data")){
	
	           	    	Map<String,Object> data = (Map<String, Object>) entry.getValue();
	           	    	for(Map.Entry<String, Object> accessTokenVal : data.entrySet()){
	
	           	    	if( accessTokenVal.getKey().equals("access_token")){
	           	    	accessToken = (String)accessTokenVal.getValue();
           	    	}

           	   }

           	    } 
             }
        	   
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
