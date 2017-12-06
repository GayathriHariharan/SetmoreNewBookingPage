package com.setmore.bookingPage;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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
	public ModelAndView getService(@PathVariable(value="id") String companyKey) throws Exception{
		
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
		String accessToken     = classObj.getAccessToken(companyKey1);
		String staffUrl        = "https://developer.setmore.com/api/v1/bookingapi/staffs";
		String staffs          = classObj.fetchDetails(staffUrl,accessToken);

		return staffs;	
	
	}
	
	@RequestMapping(value="/slots",method = RequestMethod.POST)
	@ResponseBody
	public String getSlots(@RequestBody String inputValues) throws Exception{
		
		System.out.println("the input values are" + inputValues);

		URLFetchClass classObj = new URLFetchClass();
		String accessToken     = classObj.getAccessToken(companyKey1);	
		String slotUrl          = "https://my.setmore.com/slots/v1/" + companyKey1;
		String slots           = classObj.fetchAndWriteDetails(accessToken,inputValues,slotUrl);
        System.out.println("the slots are " + slots);
        
		return slots ;
	}
	
	
	@RequestMapping(value="/allstaffslots",method = RequestMethod.POST)
	@ResponseBody
	public String getAllStaffSlots(@RequestBody String inputValues) throws Exception{
		
		System.out.println("the input values are" + inputValues);

		URLFetchClass classObj = new URLFetchClass();
		String accessToken     = classObj.getAccessToken(companyKey1);	
		String url             = "https://my.setmore.com/slots/v1/staffs/" + companyKey1;
		String slots           = classObj.fetchAndWriteDetails(accessToken,inputValues,url);
        System.out.println("slots of all the staffs " + slots);
        
		return slots ;
	}
	
	
	
	
	@RequestMapping(value="/companydetails", method = RequestMethod.GET)
	@ResponseBody
	public String getCompanyDetails() throws Exception {
		
		URLFetchClass classObj     = new URLFetchClass();
		String accessToken         = classObj.getAccessToken(companyKey1);
		String companyDetailsURL   = "https://developer.setmore.com/api/v1/bookingapi/company/" + companyKey1;
		String companyDetails      = classObj.fetchDetails(companyDetailsURL,accessToken);
		
		return companyDetails;
	}
	
	
	
	@RequestMapping(value="/createContact",method = RequestMethod.POST)
	@ResponseBody
	public String getCustomerKey(@RequestBody String inputValues) throws Exception{
		
		URLFetchClass classObj     = new URLFetchClass();
		String accessToken         = classObj.getAccessToken(companyKey1);
		String customerUrl         = "https://developer.setmore.com/api/v1/bookingapi/customer/create";
		String customerDetails     = classObj.fetchAndWriteDetails(accessToken, inputValues, customerUrl);
		System.out.println("customer creation input value " + inputValues);
		
		return customerDetails;
	}
	
	
	
	@RequestMapping(value="/bookAppointment",method = RequestMethod.POST)
	@ResponseBody
	public String bookAppointment(@RequestBody String inputValues) throws Exception{
		
		URLFetchClass classObj       = new URLFetchClass();
		String accessToken           = classObj.getAccessToken(companyKey1);
		String createAppointmentUrl  = "https://developer.setmore.com/api/v1/bookingapi/appointment/create";
		String appointmentDetails    = classObj.fetchAndWriteDetails(accessToken, inputValues, createAppointmentUrl);
		System.out.println("customer creation input value " + inputValues);
		
		return appointmentDetails;
	}
	
	
}
