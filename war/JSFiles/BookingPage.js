
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
            
 		 		$.each(result, function(key,value){

 		 			var service = value.services;
 		
 		 				$.each(service,function(k,v){	
 		 					
 		 					console.log('the service value inside the each loop' +JSON.stringify(service));

 		 					serviceName     = v.service_name;	
 		 					serviceDuration = v.duration;
 		 					serviceCost     = v.cost;
 		 					serviceKey		= v.key;
 		 					staffKeys 		= v.staff_keys;
 		 
 		 					serviceStaffPair.push(new serviceStaff(serviceName,staffKeys));

 		 					console.log('service name ' + serviceName);
 		 					var serviceDiv = document.getElementById('serviceList');

 		 					var serviceNameDiv = document.createElement('div');
 		 					serviceNameDiv.setAttribute('class','serviceNameDiv');


 		 					var serviceNameSpan = document.createElement('span');
 		 					serviceNameSpan.setAttribute('class','serviceNameSpan');
 		 					serviceNameSpan.appendChild(document.createTextNode(serviceName));
 		 					serviceNameDiv.appendChild(serviceNameSpan);

 		 					serviceDiv.append(serviceNameDiv);
 		 					
 		 					 
 		 					 $('.serviceNameDiv').on("click", function(){
 		 						
 		 						 service_name = $(this).find('span.servNameSpan').text();
 		 						 
 		 						 $.ajax({
 		 								
 		 							    type        :  'GET',
 		 								url         :  '/staff',
 		 								dataType    :  'json',
 		 								success     :  function(data){
 		 									
 		 												staffResponse = JSON.stringify(data);
 		 												console.log("staffResponse--  " + staffResponse);
 		 												
 		 												
 		 												$.each(serviceStaffPair, function(Key,value){
 		 													
 		 													if(value.serviceName == service_name ){
 		 														
 		 														service_staff_keys = value.staffKeys;
 		 														console.log("service staff Keys are: " + JSON.stringify(service_staff_keys));
 		 														
 		 														}
 		 													
 		 													});

 		 				                                $.each(data, function(key,value){
 		 													
 		 													staffs = value.staffs;
 		 													
 		 													var staffNamesul = document.createElement('ul');	
 		 													staffNamesul.setAttribute('class','staffNamesul');
 		 													
 		 													$.each(staffs, function(k,v){
 		 														
 		 														staff_key  = v.key;
 		 														
 		 														for(var i=0; i<service_staff_keys.length; i++){
 		 															
 		 															if(service_staff_keys[i] == staff_key){

 		 																staffName = v.first_name;
 		 																
 		 																var staffli = document.createElement("li");
 		 											 					staffli.setAttribute('class','staffliclass');

 		 											 					var staffNameSpan = document.createElement('span');
 		 											 					staffNameSpan.setAttribute('class','staffNameSpan');
 		 											 					staffNameSpan.appendChild(document.createTextNode(staffName));
 		 											 					staffli.appendChild(staffNameSpan);
 		 											 					
 		 											 					var staffDiv = document.getElementById('staffList');	
 		 											 					staffNamesul.appendChild(staffli);
 		 											 					staffDiv.append(staffNamesul);
 		 															
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


 		 				});


 		 		});
 		 		
 		 			 