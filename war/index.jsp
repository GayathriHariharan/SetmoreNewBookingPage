<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Setmore Booking page</title>
 
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIWbhUy5liy6BOaw982UY8cAmyrNjLCDA"></script>
 <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	 
	  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	  
</head>

<script>

result = ${services};
console.log("the result value is " + result);

</script>

<body>
 <div id='map-canvas'></div>
 <div id='container'>
 <h1>CompanyName</h1>
 
 <div id ='serviceContainer' class='dropdownContainer'>
	
	  <select id='selectService'> 
	  <option disabled selected value> Select service </option>
	  </select>
	  <div id='serviceList' class ='serviceListClass'></div>
	  
  	</div>
  	
  	<div id='staffContainer' class ='dropdownContainerS'>
  	   
  	    <div id='loader'></div>
  	    <select id='selectStaff' disabled>
  	     </select>
  	    
  		<div id='staffList' class = 'staffListClass'></div>
  	
  	</div>
  	
  	 <div id='datePicker'></div>
    
    
    <div id="displaySlots">
    </div>
  	
  	</div>
  	 <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	 
	  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <link rel = "stylesheet" type="text/css" href = "/DesignFiles/design.css" /> 
    
	  <script src="/JSFiles/BookingPage.js?id=1"></script>  
</body>
</html>