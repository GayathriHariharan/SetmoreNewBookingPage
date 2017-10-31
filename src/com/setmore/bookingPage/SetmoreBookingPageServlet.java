package com.setmore.bookingPage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.setmore.bookingPage.URLFetchClass;
@Controller
public class SetmoreBookingPageServlet  {
	
	String company_key = "";
	
	ModelAndView model;
	

	@RequestMapping(value="/", method=RequestMethod.GET)
	public ModelAndView login(){
	    return new ModelAndView("index");
	}
	
	
	
	@RequestMapping(value="/service",method=RequestMethod.GET)
	@ResponseBody
	public String getService() throws Exception{
		
		URLFetchClass classObj = new URLFetchClass();
		String accessToken = classObj.getAccessToken();
		String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
		String services    = classObj.fetchDetails(serviceUrl,accessToken);
		
		
		return services;	
	
	}
	
	
	
	@RequestMapping(value="/staff",method=RequestMethod.GET)
	@ResponseBody
	public String getStaff() throws Exception{
		
		URLFetchClass classObj = new URLFetchClass();
		String accessToken = classObj.getAccessToken();
		String staffUrl = "https://developer.setmore.com/api/v1/bookingapi/staffs";
		String staffs    = classObj.fetchDetails(staffUrl,accessToken);
		

		return staffs;	
	
	}
	
	
	@RequestMapping(value="/bookingpage/{companyKey}", method=RequestMethod.GET)
	@ResponseBody
	public String getCompnayKey(@PathVariable String companyKey) throws Exception{
		
		company_key = companyKey;
		System.out.println("Inside the test method: " + companyKey);
		
		URLFetchClass classObj = new URLFetchClass();
		String accessToken = classObj.getAccessToken();
		String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
		String services    = classObj.fetchDetails(serviceUrl,accessToken);
		
		
		return services;
		
	}
	
	
}
