<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Setmore Booking page</title>
 
 <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	 
	  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	  <link rel = "stylesheet" type="text/css" href = "/DesignFiles/design.css" /> 
	  
	   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIWbhUy5liy6BOaw982UY8cAmyrNjLCDA"></script>
	  
	  <script src="/JSFiles/BookingPage.js"></script>  
	  
	  
</head>

<body>

<div id='map-canvas'></div>

<div id="container">
<br>
<div id='serviceHeader'><span><h1>Book your Service!</h1></span></div>

	<div id ='serviceDiv'> 
  
	  <div id='serviceList' class ='serviceListClass'></div>
	  
  	</div>
  	
  	<div id='staffDiv'>
  	
  		<div id='staffList' class = 'staffListClass'></div>
  	
  	</div>
</div>
</body>
</html>