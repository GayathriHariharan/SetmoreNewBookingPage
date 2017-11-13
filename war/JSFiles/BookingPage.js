$(document).ready(function(){
	
	console.log("test");
	$('#loader').hide();
	
	
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
			console.log(address);
			
			console.log("company name : " + company_name);
			
			/*
			$('#companyName').val(company_name);
			$('#companyName').show();
			*/
			
			/*
			
			var geocoder = new google.maps.Geocoder();
		
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK)
			  {
			      
			      latitude = results[0].geometry.location.lat();
			      longtitude =  results[0].geometry.location.lng();
			  }
			});
			
			console.log("Latitude = " + latitude);
			console.log("Longtitude = " + longtitude);
			*/
	

	var mapOptions = {
	zoom: 12,
	center: new google.maps.LatLng(13.0827, 80.2707),
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map    = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
	var marker = new google.maps.Marker({

		position: new google.maps.LatLng(13.0827, 80.2707),
	    map: map

});


var serviceStaffPair=[];
	
   function serviceStaff(serviceName,serviceDuration,staffKeys){
		 this.serviceName     = serviceName;
		 this.serviceDuration = serviceDuration;
		 this.staffKeys       = staffKeys;
	 }
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
 		 		
 		 		//var selectedService = $("#selectService option:selected").text();
 		 		//console.log(selectedService);
 		 	
 		 		 var selectStaff = $('#selectStaff');
 	 		 	 var staffDiv  = document.getElementById('staffList');
 		 	
 	 		 	var selectService = document.getElementById("selectService"),
 	 		    selectedNode = selectService.options[selectService.selectedIndex];
 	 	
 		$('#selectService').change(function(event){
 			
 			$('#selectStaff').removeAttr('disabled');
 	 		$('#loader').show();
 	 		
 	 	//	$('#selectStaff').find("option:not(:first)").remove();
 			
 	 		
 	 		
 	 		$('#selectStaff').find("option").remove();
 	 		selectStaff.prepend('<option disabled selected value> Select staff </option>');
 	 		
 	 		
 	 		
 	 		
 	 		
 			$this = $(event.target);
 			
 			service_name = ($this).val();
 			
 			console.log("service selected = " + service_name);
 			
 	

 		service_staff_keys = [];
 		
						 $.ajax({
								
							    type        :  'GET',
								url         :  '/bookingpage/staff',
								dataType    :  'json',
								success     :  function(data){
									         
									
									         $('#loader').hide();
									         
									  // selectStaff.prepend('<option disabled selected value> Select staff </option>');
									         
									         console.log("staff result " + JSON.stringify(data));
												
									           staffResponse = JSON.stringify(data);
												
									           $.each(serviceStaffPair, function(Key,value){
													
									        	   if(value.serviceName == service_name ){	
														service_staff_keys = value.staffKeys;
														service_duration   = value.serviceDuration+"";
														}
													
													});

				                                $.each(data, function(key,value){
													
													staffs = value.staffs;
												
													$.each(staffs, function(k,v){
														
														staff_key  = v.key;
														console.log("the staff key " + staff_key);
														
														for(var i=0; i<service_staff_keys.length; i++){
															
															if(service_staff_keys[i] == staff_key){

																staffName = v.first_name;
																 staffkey = v.key;
									 		 					 $('<option />', {value: staffkey, text: staffName}).appendTo(selectStaff);
									 		 					 
							 $('#selectStaff').change(function(event){
									 		 	
									 			$target    = $(event.target);
									 			staff_key = $target.val();
									 			console.log("the staff key selected for the target is " +staff_key);
									 		 		
									 			// $('#datePicker').datepicker({ "dateFormat" : "mm/dd/yyyy" });
									 			
									 			$('#datePicker').datepicker({
									 				 
									 				dateFormat : 'mm/dd/yy',
									 		 			          onSelect : function() {
									 		 						console.log("Inside datepicker");
									 		 							$('#availableSlots').show();	
									 		 							displaySlots = $('#availableSlots');
									 		 							
									 		 							 // var date = $(this).datepicker('getDate');
									 		 							// date = $(this).datepicker('setDate',date);
								                                          selected_date = $("#datePicker").val()+"";
									 		 							 console.log("inside the datepicker, date = " , selected_date );
									 		 							 var inputValues = {
									 		 									
									 		 									'dateStr'    : selected_date,
									 		 									'resourceKey': staff_key,
									 		 									'duration'   : service_duration,
									 		 									'timezone'   : timeZone
									 		 									
									 		 							};
									 		 							console.log(JSON.stringify(inputValues));
									 		 //Making ajax call to get the time slots 							
									 		 	
									 		 	$.ajax({
									 		 		url   :'/bookingpage/slots',   
									 		 		type  : 'POST',
										        	   contentType :'application/json',
										        	   data : JSON.stringify(inputValues),
										        	   
										        	   success : function(result){
										        		   console.log('inside the success call function' + result);
										        		   
										        		   var slotResponse = JSON.parse(result);
										        		   console.log('slot response ' + slotResponse);
										        		   

										        		   let availableSlots = JSON.parse(slotResponse.msg);
										        		 
										        		   $.each(availableSlots , function(index,value){
										        			  console.log(value);
										        			  console.log( moment.tz(value,timeZone).format("hh:mm a") );
										        			  
										        			  slotValue =  moment.tz(value,timeZone).format("hh:mm a");
										        			  
										        			
										        			  
										        			
										        			 

										        		   });
										        		   
										        		   
										        	   }, 
										        	   
										        	   error : function(xhr, status, error){
										        		   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
										        	   }
									 		 	
									 		 	});		
									  }						 
								});
									 		 					
						  });
									 		 				
															}									
														}
														
													});
													
												 });		
				                                
										},
								
								failure     :  function(data){
									           $('#loader').hide();
									           console.log('Failure function: ' + data);
									           
										}
							 
							});
						 
 		});

 		
		},
		failure  : function(){
			
		}
	});
 			
});

 	 		 	