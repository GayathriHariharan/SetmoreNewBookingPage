package com.setmore.bookingPage;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.setmore.bookingPage.URLFetchClass;
@Controller
@RequestMapping("/bookingpage")
public class SetmoreBookingPageServlet  {
	
	ModelAndView model;
	String companyKey1 ;
   
	
	@RequestMapping(value="/{id}")
	public ModelAndView getCompanyDetails(@PathVariable(value="id") String companyKey) throws Exception{
		
		String serviceUrl = "https://developer.setmore.com/api/v1/bookingapi/services";
		
		URLFetchClass classObj = new URLFetchClass();
		this.companyKey1 = companyKey;
		
		String accessToken = classObj.getAccessToken(companyKey);
		String services    = classObj.fetchDetails(serviceUrl, accessToken);
		
		Map<String, Object> myModel = new HashMap<String, Object>();
		myModel.put("services", services);
		
		return new ModelAndView("index", myModel);
			
	}
	
	
	@RequestMapping(value="/staff",method=RequestMethod.GET)
	@ResponseBody
	public String getStaff() throws Exception{
		
		URLFetchClass classObj = new URLFetchClass();
		String accessToken = classObj.getAccessToken(companyKey1);
		String staffUrl   = "https://developer.setmore.com/api/v1/bookingapi/staffs";
		String staffs    = classObj.fetchDetails(staffUrl,accessToken);

		return staffs;	
	
	}
	
	@RequestMapping(value="/slots",method = RequestMethod.POST)
	@ResponseBody
	public String getSlots(@Requestparam){
		return "";
	}
}
