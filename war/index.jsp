<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Setmore Booking page</title>
 
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIWbhUy5liy6BOaw982UY8cAmyrNjLCDA"></script>
      <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
     
      <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
 
  
<style>
.heading 
{
    max-width: 25.5rem;
    width: 100%;
}

.top 
{
    height: 19rem;
    width: 25%;
    padding: .5rem 0;
    z-index: 0;
}

.heading .title 
{
    margin-left: 2%;
    margin-top: 1%;
}

.Company-details 
{
    position: relative;
    width: 100%;
}
.company-banner 
{
    color: black;
    margin: auto;
    padding-bottom: 8.25%;
    position: relative;
    width: 100%;
}
.company-image 
{
    width: 15%;
    height: 146%;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
    position: absolute;
    left: 10%;
    bottom: 88%;
}

.company-name 
{
    bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.2rem;
    margin: 0 9.5rem;
    position: absolute;
    margin-top: 21%;
    text-decoration: none;
}
.company-title 
{
    font-size: 2rem;
    font-weight: 300;
    line-height: 2.5rem;
}

.company-title a
{
    text-decoration: none;
}

.star 
{
    margin: 0 8px 0 0;
}
.customer-rating 
{
    display: inline-block;
    outline: none;
}

.company-address 
{
    margin-right: 1.3rem;
}

.companyplace 
{
    color: black;
    text-decoration: none;
    padding: 0px 0px 0px 4px;
}
#map-canvas 
{
    height: 45%;
    width: 100%;
    right: 0;
    z-index: 0;
    position: absolute;
}
</style>
      
</head>

     <script>

         result = ${services};
         console.log("the result value is " + result);

     </script>

<body>

<section class="booking-page">
 <div id="map-canvas"></div>
  <div class="heading top">
       
    </div>
 <div class="Company-details">
    <div class="company-banner">
        <div class="company-image" style="background-image: url('https://lh3.googleusercontent.com/p/AF1QipOScr2DgGuIYpJ0O7U-yTCbGW5N68M7syrQ4se3=k');"></div>
        <div class="company-name">
            <div class="company-title">
            <div id = "companyName">Company Name</div>
            </div>
             <div class="company-address">
                <a class="companyplace" href="https://maps.google.com/?cid=3184590829463530202" target="_blank">Company Address</a>
            </div>
        </div>
    </div>
</div>
    
 <div id='container'>
 
 <div id ='serviceContainer' class='dropdownContainer'>
    
      <select id='selectService'> 
      <option disabled selected > Select service </option>
      </select>
      <div id='serviceList' class ='serviceListClass'></div>
      
    </div>
    
    
 <div id='staffContainer'    class ='dropdownContainer'>
       
        <div id='loader'></div>
        <select id='selectStaff' disabled>
        <option disabled selected > Select staff </option>
         </select>
        
        <div id='staffList' class = 'staffListClass'></div>
    
    </div>
    
     <input type = "text" id='datePicker'></input>
        
    </div>
    <div id="availableSlots"><ul class ='slotsUl'> </ul> </div>  
     
 </section>      
     
      <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <script src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js" type="text/javascript"></script>
      <script src="https://momentjs.com/downloads/moment-timezone.js"></script>
      <script src="https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.js"></script>
      <script src="https://momentjs.com/downloads/moment-timezone-with-data.js"></script> 
      <link rel = "stylesheet" type="text/css" href = "/DesignFiles/design.css" /> 
      <script src="/JSFiles/BookingPage.js?id=2"></script>  
</body>
</html>