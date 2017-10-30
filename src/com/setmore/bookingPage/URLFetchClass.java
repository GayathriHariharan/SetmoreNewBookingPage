package com.setmore.bookingPage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import org.codehaus.jackson.map.JsonSerializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

import net.sf.json.JSONSerializer;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;


public class URLFetchClass {

    /* public static void main(String args[]) throws Exception{
    	 URLFetchClass object = new URLFetchClass();
    	String at= object.getAccessToken();
    	String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
    	 object.fetchDetails(serviceUrl,at);
    	 
     }*/
     
     // String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
     // String saffUrl = "https://developer.setmore.com/api/v1/bookingapi/staffs";
      
      

     
           Map<String,String> hashmap = new HashMap<String,String>();           
           ObjectMapper objectmapper      = new ObjectMapper();
           
	
           public String getAccessToken() throws IOException, JSONException{
        	
        	   URL obj = new URL("https://developer.setmore.com/api/v1/o/oauth2/token?refreshToken=7af7d05d50SB3I6gYN6AosocWO_N3Tquz1s0w4_vNvnw8");
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
        	    	     	    		
        	    		Map<String,Object> token = (Map<String, Object>) entry.getValue();
        	    	    		
        	    		   for(Map.Entry<String, Object> entryVal : token.entrySet()){
        	    			
        	    			   if( entryVal.getKey().equals("token")){
        	    			
        	    				      Map<String,Object> accessTokenValue = (Map<String, Object>) entryVal.getValue();
        	    				          for(Map.Entry<String, Object> accessTokenEntry : accessTokenValue.entrySet()){
	        	    					      if(accessTokenEntry.getKey().equals("access_token"))
	        	    						   accessToken = (String) accessTokenEntry.getValue();    	    						
        	    				}
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
