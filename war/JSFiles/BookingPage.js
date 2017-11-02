$(document).ready(function(){
		
	$.ajax({
		type     : "GET",
		url      : "/bookingpage/companydetails",
		dataType : "json",
		success  : function(res){
			console.log("companydetails " + JSON.stringify(res));
			$.each(res, function(key,value){
				data = value.data;
			});
				console.log("data " + data);
				$.each(data , function(x,y){
					
					var companyDetails = y.companyDetails;
					console.log("company details " + companyDetails);
					$.each(companyDetails , function(k,v){
						region = v.region; //state
						postal_code = v.postal_code;
						locality = v.locality; //city
						timeZone = v.timeZone;
						street_address = v.street_address;
						country = v.country; // 3 characers eg. ind
						currency = v.currency; // eg. INR
						
						console.log(region);
						console.log(postal_code);
						console.log(locality);
						console.log(timeZone);
						console.log(street_address);
						console.log(country);
						console.log(currency);
						
					});
					
				});
				
			
		
	
	$('#loader').hide();
 
	var mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng(-45.512794, -122.679565),
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	var marker = new google.maps.Marker({
	
		position: new google.maps.LatLng(-45.512794, -122.679565),
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
 		$('#selectStaff').empty().append('<option value="0"> select Staff </option>');

						 $.ajax({
								
							    type        :  'GET',
								url         :  '/bookingpage/staff',
								dataType    :  'json',
								success     :  function(data){
									         
									         $('#loader').hide();
												
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
														
														for(var i=0; i<service_staff_keys.length; i++){
															
															if(service_staff_keys[i] == staff_key){

																staffName = v.first_name;
																 staffkey = v.key;
									 		 					 $('<option />', {value: staffName, text: staffName}).appendTo(selectStaff);
									 		 					 
									 $('#selectStaff').change(function(event){
									 		 	
									 			target = $(event.target);
									 			
									 			console.log()
									 		 		$('#datePicker').datepicker({
									 		 						dateFormat: "mm-dd-yyyy" ,
									 		 						onSelect : function(string, text){
									 		 						
									 		 							$('#displaySlots').show();			
									 		 							 date = $(this).datepicker( 'getDate' );
									 		 							 

									 		 							var inputValues ={
									 		 									
									 		 									'dateStr':date,
									 		 									'resourceKey':staffkey,
									 		 									'duration':serviceDuration,
									 		 									'timeZone':'Asia/calcuta'
									 		 									
									 		 							}
									 		 							
									 		 //Making ajax call to get the time slots 							
									 		 	
									 		 	$.ajax({
									 		 			
									 		 		   type  : "POST",
										        	   url  :'/slots',
										        	   dataType :'json',
										        	   data : JSON.stringify(staffkeys),
										        	   contentType: 'application/json',
										        	   success : function(slotResponse){
										        		   console.log('slotResponse');
										        		   
										        	   }, 
										        	   failure : function(response){
										        		   console.log("failure response for slot " + response);
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

 	 		 	