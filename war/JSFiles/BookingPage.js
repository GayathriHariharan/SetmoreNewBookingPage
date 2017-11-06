$(document).ready(function(){
	
	console.log("test");
	$('#loader').hide();
	
	
	$.ajax({
		type     : "GET",
		url      : "/bookingpage/companydetails",
		dataType : "json",
		success  : function(res){
			console.log();
			$.each(res, function(k,v){
				company_details = v.companyDetails;
			});
			
			region = company_details.region;
			postal_code = company_details.postal_code;
			locality = company_details.locality;
			timeZone = company_details.timeZone;
			street_address = company_details.street_address;
			country = company_details.country;
			currency = company_details.currency;
			
			address = street_address + "," + locality + "," + country;
			console.log(address);
			
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

	console.log("Hi this is test");

var serviceStaffPair=[];
	
   function serviceStaff(serviceName,staffKeys){
		 this.serviceName = serviceName;
		 this.staffKeys   = staffKeys;
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
 		 
 		 					serviceStaffPair.push(new serviceStaff(serviceName,staffKeys));

 		 					//creating dropdown
 		 					 $('<option />', {value: serviceName, text: serviceName , class :'optionClassName'}).appendTo(serviceSelect);
 		 					 
 		 				});
 		 				
 		 		});
 		 		
 		 		serviceSelect.appendTo(serviceDiv);
 		 		
 		 		var selectedService = $("#selectService option:selected").val();
 		 		console.log(selectedService);
 		 	
 		 		 var selectStaff = $('#selectStaff');
 	 		 	 var serviceDiv  = document.getElementById('staffList');
 		 	
 	 		 	var selectService = document.getElementById("selectService"),
 	 		    selectedNode = selectService.options[selectService.selectedIndex];
 	 	
 		$('#selectService').change(function(event){
 			
 			$('#selectStaff').removeAttr('disabled');
 	 		$('#loader').show();
 			
 			$this = $(event.target);
 			
 			service_name = ($this).val();
 			
 			$('selectStaff').removeAttr('disabled');
 			$('#loader').show();

 		service_staff_keys = [];
 		
						 $.ajax({
								
							    type        :  'GET',
								url         :  '/bookingpage/staff',
								dataType    :  'json',
								success     :  function(data){
									         
									         $('#loader').hide();
									         console.log("staff result " + JSON.stringify(data));
												
									           staffResponse = JSON.stringify(data);
												
									           $.each(serviceStaffPair, function(Key,value){
													
									        	   if(value.serviceName == service_name ){	
														service_staff_keys = value.staffKeys;
														
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
									 				 			  
									 		 			          onSelect : function() {
									 		 						console.log("Inside datepicker");
									 		 							$('#displaySlots').show();			
									 		 							 var date = $(this).datepicker('getDate');
									 		 							  
									 		 							// dateFormat = 'MM/DD/YYYY';
								
									 		 							 console.log("inside the datepicker, date = " + date);
									 		 							 var inputValues = {
									 		 									
									 		 									'dateStr':'11/08/2017',
									 		 									'resourceKey': staff_key,
									 		 									'duration':'60',
									 		 									'timezone':'Asia/Calcutta'
									 		 									
									 		 							};
									 		 							
									 		 //Making ajax call to get the time slots 							
									 		 	
									 		 	$.ajax({
									 		 		url   :'/bookingpage/slots',   
									 		 		type  : 'POST',
									 		 		contentType: 'application/json',
										        	   dataType :'application/json',
										        	   data : JSON.stringify(inputValues),
										        	   
										        	   success : function(slotResponse){
										        		   console.log('inside the success call function' + slotResponse);
										        		   
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

 	 		 	