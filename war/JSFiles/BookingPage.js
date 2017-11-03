$(document).ready(function(){
		
	$.ajax({
		type     : "GET",
		url      : "/bookingpage/companydetails",
		dataType : "json",
		success  : function(res){
			console.log("companydetails " + JSON.stringify(res));
			

			
			
			
	
	
	$('#loader').hide();
 
	var mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng(13.0827, 80.2707),
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
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
									 		 					 $('<option />', {value: staffName, text: staffName}).appendTo(selectStaff);
									 		 					 
							 $('#selectStaff').change(function(event){
									 		 	
									 			$target = $(event.target);
									 			staff_name = $target.val();
									 			console.log("the staff select for the target is " +staff_name);
									 		 		
									 			$('#datePicker').datepicker({
									 		 					
									 		 			     
									 		 			          onSelect : function(string, text){
									 		 						
									 		 							$('#displaySlots').show();			
									 		 							 date = $(this).datepicker( 'getDate' );
									 		 							  
									 		 							 console.log('inside the datepicker ' + date);

									 		 							var inputValues = {
									 		 									
									 		 									'dateStr':date,
									 		 									'resourceKey':staffkey,
									 		 									'duration':serviceDuration,
									 		 									'timezone':'Asia/Calcutta'
									 		 									
									 		 							};
									 		 							
									 		 //Making ajax call to get the time slots 							
									 		 	
									 		 	$.ajax({
									 		 			
									 		 		   type  : 'GET',
										        	   url  :'/bookingpage/slots',
										        	   dataType :'json',
										        	   data : JSON.stringify(inputValues),
										        	   contentType: 'application/json',
										        	   success : function(slotResponse){
										        		   console.log('inside the success call function' + slotResponse);
										        		   
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

 	 		 	