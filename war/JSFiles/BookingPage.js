$(document).ready(function(){
	
	$('#loader').hide();
	
	
	var serviceStaffPair=[];
	
	   function serviceStaff(serviceName,serviceDuration,staffKeys){
			 this.serviceName     = serviceName;
			 this.serviceDuration = serviceDuration;
			 this.staffKeys       = staffKeys;
		 }
	   
	 var staffDetails=[];
	   
	   function staffKeyAndName(staffKey,staffName){
		   this.staffKey  = staffKey;
		   this.staffName = staffName;
	   }
	
	   
function makeLiEmpty(){
	  		var slotUl = $('#slotsUl');	
	  		if($('#slotsUl li').hasClass('slotsLi')){
			slotUl.empty();
	  		}
	}


	   
	   setDateField();
	   companyDetails();
	   
 
		function setDateField(){
			
		$('#datePicker').datepicker({
			 
				dateFormat : 'mm/dd/yy',
				onSelect   : displaySlots
		 			        	  
		});
		$('#datePicker').datepicker('setDate', new Date());
		console.log($('#datePicker').val());
		
		}
		
		
//Function to display the service name in drop down
		
   function populateServiceDropdown(){
	   
	    var serviceSelect = $('#selectService');
  		var serviceDiv = document.getElementById('serviceContainer');
  		
  
  		
  	   		console.log("service result :  "+ JSON.stringify(result));

  		
		 		$.each(result, function(key,value){

		 			var service = value.services;
		 				
		 			$.each(service,function(k,v){	

		 				    serviceName     = v.service_name;	
		 					serviceDuration = v.duration;
		 					serviceCost     = v.cost;
		 					serviceKey		= v.key;
		 					staffKeys 		= v.staff_keys;
		 
		 					serviceStaffPair.push(new serviceStaff(serviceName,serviceDuration,staffKeys));

		 					//creating dropdown
		 					 $('<option />', {value: serviceName, text: serviceName , class :'optionClassName'}).appendTo(serviceSelect);
		 					 
		 				});
		 				
		 		});
		 		
		 		serviceSelect.appendTo(serviceDiv);
		 		
		 		
	   
   }
   
 //Function to show the staff list
 		 	
   function populateStaffDropdown(){
	   
	   
	   $('#loader').show();
 		
 		$('#selectStaff').find('option[value!="all"]').remove();
      
 		service_name = $("#selectService option:selected").val();
		console.log("service selected = " + service_name);
		//makeLiEmpty();
			
			$.ajax({
				
			    type        :  'GET',
				url         :  '/bookingpage/staff',
				dataType    :  'json',
				success     :  function(data){
					         
					         $('#loader').hide();
					         
					           staffResponse = JSON.stringify(data);
								
					           var staffKeysAndServiceDuration = getStaffKeysAndServiceDuration();
					    	   
					    	   var service_staff_keys = staffKeysAndServiceDuration[0];
					           
					           
                                $.each(data, function(key,value){
									
									staffs = value.staffs;
								
									$.each(staffs, function(k,v){
										
										staffDetails.push(new staffKeyAndName(v.key,v.first_name));
										
										staff_key  = v.key;
										
										for(var i=0; i<service_staff_keys.length; i++){
											
											if(service_staff_keys[i] == staff_key){

												staffName = v.first_name;
												 staffkey = v.key;
					 		 					 $('<option />', {value: staffkey, text: staffName}).appendTo($('#selectStaff'));
											}									
										}
										
									});
									
									console.log("staffDetails = " + staffDetails);
									
								 });	
                                
                                
						},
											
					failure     :  function(data){
									  $('#loader').hide();
									  console.log('Failure function: ' + data);
												           
									}

			});
			
   }
   
   
   
   function displaySlots(){
	   
	   selected_date = $("#datePicker").val()+"";
	   
	   var staffKeysAndServiceDuration = getStaffKeysAndServiceDuration();
	   
	   var service_duration = staffKeysAndServiceDuration[1];
	   
	   if(($("#selectStaff option:selected").val()) == "all"){
		   console.log("important service_staff_keys = " + staffKeysAndServiceDuration[0]);
			staff_key = staffKeysAndServiceDuration[0];
		}
	   else{
		   staff_key  = $("#selectStaff option:selected").val();
		}
	   
		console.log("the staff key selected for the target is " +staff_key);
		
		makeLiEmpty();
	   
		 var inputValues = {
					
					'dateStr'    : selected_date,
					'resourceKey': staff_key,
					'duration'   : service_duration,
					'timezone'   : timeZone
					
			};
			console.log(JSON.stringify(inputValues));
			
			if( $("#selectStaff option:selected").val() == "all"){
				
				//Making ajax call to get the time slots for all staffs
				
				$.ajax({
	 		 		url   :'/bookingpage/allstaffslots',   
	 		 		type  : 'POST',
		        	contentType :'application/json',
		        	data : JSON.stringify(inputValues),
		        	   
		        	   success : function(result){
		        		   
		        		   var slotResponse = JSON.parse(result);
		        		   console.log("slotResponse = " + slotResponse);
		        		   let availableSlots = JSON.parse(slotResponse.msg);
		        		   
		        		   
		        		   $.each(availableSlots , function(key,value){
		        			 
		        			   eachStaffKey = key;
		        			   console.log(key);
		        			  
		        			  $.each(staffDetails, function(index,value){
		        				 
		     
		        					  if(value.staffKey == eachStaffKey){
		        						  eachStaffName = value.staffName;
		        						
		        					  }
		        					  
		        			  });
		        			  
		        			  var staffName = $("<li>").text(eachStaffName);
		        			  staffName.appendTo(slotsUl);
		        			 
		        		
		        			//Looping through each staff slots
		        			  
		        			  for (var key in value) {
		        				    
		        				    if (value.hasOwnProperty(key)) {           
		        				        console.log(value[key]);
		        				        var timeZoneVal  = value[key];
		        				        
		        				        slot = $("<li>").text( moment.tz(timeZoneVal,timeZone).format("hh:mm a"));
		  		        			    slot.addClass('slotsLi');
		  		        			    slot.appendTo(slotsUl);
		  		        			   
		        				    }
		        				  
		        				}
		        			  
		        			  
		        		   });
		        		   
		        		   
		        	   }, 
		        	   
		        	   error : function(xhr, status, error){
		        		   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
		        	   }
	 		 	
	 		 	});
				
			}
			else{
				
				// Making AJAX call to get the time slots of the selected staff
	 		 	
	 			$.ajax({
	 		 		url   :'/bookingpage/slots',   
	 		 		type  : 'POST',
		        	contentType :'application/json',
		        	data : JSON.stringify(inputValues),
		        	   
		        	   success : function(result){
		        		   
		        		   var slotResponse = JSON.parse(result);
		        		   let availableSlots = JSON.parse(slotResponse.msg);
		        		 
		        		   $.each(availableSlots , function(index,value){
		        			  
		        			   console.log( moment.tz(value,timeZone).format("hh:mm a"));
		        			   
		        			  slot = $("<li>").text( moment.tz(value,timeZone).format("hh:mm a"));
		        			  slot.addClass('slotsLi');
		        			  
		        			  slot.appendTo(slotsUl);

		        		   });
		        		   
		        		   
		        	   }, 
		        	   
		        	   error : function(xhr, status, error){
		        		   	   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
		        	   }
	 		 	
	 		 	});
				
			}

		
   }
   
   
   
 //Function to get the company details
   
   
   function companyDetails(){
		$.ajax({
	
		type     : "GET",
		url      : "/bookingpage/companydetails",
		dataType : "json",
		success  : function(res){
			console.log(JSON.stringify(res));
			$.each(res, function(k,v){
				company_details = v.companyDetails;
			});
			
			region = company_details.region;
			postal_code = company_details.postal_code;
			locality = company_details.locality;
			timeZone = company_details.timeZone;
			street_address = company_details.street_address;
			company_name = company_details.companyName;
			country = company_details.country;
			currency = company_details.currency;
			
			address = street_address + "," + locality + "," + country;
			
			$('#company-name').text(company_name);
			$('#company-name').show();
			
			$('#company-address').text(address);
			$('#company-address').show();
			
			
			
			geocoder = new google.maps.Geocoder();
		
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK)
			  {
			      
			      latitude = results[0].geometry.location.lat();
			      longtitude =  results[0].geometry.location.lng();
			      
			      
				  var mapOptions = {
							zoom: 12,
							center: new google.maps.LatLng(latitude,longtitude),
							mapTypeId: google.maps.MapTypeId.ROADMAP
							}
				  
							var map    = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
				  
							var marker = new google.maps.Marker({

								position: new google.maps.LatLng(latitude,longtitude),
							    map: map

						});
			     
			  }
			});
			
			populateServiceDropdown();
			populateStaffDropdown();
			displaySlots();
			
		},
		failure  : function(){
				   console.log("inside failure function");
		}
	});
		
	}
   
   
///////////////////////////
	
   var getStaffKeysAndServiceDuration = function(){
	   
	   var service_staff_keys;
	   var service_duration;
	   
	   $.each(serviceStaffPair, function(Key,value){
			
    	   if(value.serviceName == service_name ){	
				service_staff_keys = value.staffKeys;
				service_duration   = value.serviceDuration+"";
				}
			
			});
       
       return [service_staff_keys , service_duration];
   };
   
   
 ///////////////////////////
  /* 
   function getStaffNameUsingStaffKey(){
	   staffDetails = getStaffDetails;
	   console.log("staffDetails = " + staffDetails);
		  $.each(staffDetails, function(index,value){
			  console.log("value = " + JSON.stringify(value)); 
			  $.each(JSON.stringify(value),function(k,v){
				  console.log(k);
				  console.log(v);
				  if(v.staffKey == eachStaffKey){
					  eachStaffName = v.staffName;
					  console.log(eachStaffName);
				  }
				  
			  });
		  });
   }
   
///////////////////////////   
*/   
   $('#selectStaff').change(displaySlots);
   
   $('#selectService').change(function(){
	   populateStaffDropdown();
	   displaySlots();
   });
   
/////////////////////////////
   
   
}); 
