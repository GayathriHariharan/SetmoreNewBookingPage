
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


var service_staff_keys = [];



var serviceStaffPair=[];
	
   function serviceStaff(serviceName,staffKeys){
		 this.serviceName = serviceName;
		 this.staffKeys   = staffKeys;
	 }
   		var select = $('<select />');
		var serviceDiv = document.getElementById('serviceList');
		select.prepend('<option disabled selected value> -- select an option -- </option>');
		
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
 		 					
 		 					 $('<option />', {value: serviceName, text: serviceName}).appendTo(select); 
 		 					 		 					 

 		 				});
 		 				
 		 				

 		 		});
 		 		
 		 		select.appendTo(serviceDiv);

 		 		
 		 		 $('.serviceNameDiv').on("click", function(){
						 
						 
						 $('#serviceDiv').hide();
						 $('#staffDiv').show();
						
						 service_name = $(this).text();
						 
						 $.ajax({
								
							    type        :  'GET',
								url         :  '/staff',
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
																
																
																var saffDiv = document.getElementById('staffList');

									 		 					var staffNameDiv = document.createElement('div');
									 		 					staffNameDiv.setAttribute('class','staffNameDiv');


									 		 					var staffNameSpan = document.createElement('span');
									 		 					staffNameSpan.setAttribute('class','staffNameSpan');
									 		 					staffNameSpan.appendChild(document.createTextNode(staffName));
									 		 					staffNameDiv.appendChild(staffNameSpan);

									 		 					staffDiv.append(staffNameDiv);
																
															
															}									

														}
														
													});
													
												 });								
												
										},
								
								failure     :  function(data){
									
									           console.log('Failure function: ' + data);
									           
										}
							 
								
							});
					 });

 		 		
 		 		
 		 			 