
$(document).ready(function(){
var mapOptions = {
	zoom: 8,
	center: new google.maps.LatLng(13.0826802, 80.2707184),
	mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	var marker = new google.maps.Marker({
	position: new google.maps.LatLng(13.0826802, 80.2707184),
	map: map
});

		


var serviceStaffPair=[];
	
   function serviceStaff(serviceName,staffKeys){
		 this.serviceName = serviceName;
		 this.staffKeys   = staffKeys;
	 }
   		var serviceSelect = $('#selectService');
		
   		var serviceDiv = document.getElementById('serviceList');
	
		serviceSelect.prepend('<option disabled selected value>Select service </option>');
		
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
 		 					
 		 					 $('<option />', {value: serviceName, text: serviceName}).appendTo(serviceSelect); 
 		 					
 		 					 

 		 				});
 		 				

 		 		});
 		 		
 		 		serviceSelect.appendTo(serviceDiv);
 		 		
 		 	
 		 		 var selectStaff = $('#selectStaff');
 	 		 	 var serviceDiv  = document.getElementById('staffList');
 		 		
 		 $(document).on('click', function(event){
 			
 			target = event.target;
 			
 			console.log('target ' + JSON.stringify(target));
 			
 			if(target.nodeName =='OPTION'){
 			
 				
 		 			 $('#selectStaff').removeAttr('disabled');
 		 			
						 $('#serviceDiv').hide();
						 $('#staffDiv').show();
						
						 service_name = $(this).text();
						 console.log('service name ' + service_name);
						 
						 $.ajax({
								
							    type        :  'GET',
								url         :  '/bookingpage/staff',
								dataType    :  'json',
								success     :  function(data){
									
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
																
									 		 					 $('<option />', {value: staffName, text: staffName}).appendTo(selectStaff); 

																
															
															}									

														}
														
													});
													
												 });								
												
										},
								
								failure     :  function(data){
									
									           console.log('Failure function: ' + data);
									           
										}
							 
								
							});
 			}else{
 				return;
 			}
					 });

 		 		
});	
 		 			 