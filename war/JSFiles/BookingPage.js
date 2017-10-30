
$(document).ready(function(){	
	
	
	
	var serviceStaffPair=[];
	function serviceStaff(serviceName,staffKeys){
		 this.serviceName = serviceName;
		 this.staffKeys   = staffKeys;
	 }
	 
	
	//Making AJAX call to fetch the service
	
	
	
	 $.ajax({

		 	url      : '/service',
		 	type     : 'GET',
		 	dataType : 'json',
		 	success  : function(result){
		 		
		 		//console.log("returned data" + JSON.stringify(result));

		 		$.each(result, function(key,value){


		 			var service       = value.services;
		 			var serviceNameul = document.createElement('ul');	
		 			serviceNameul.setAttribute('class','serviceNameul');

		 			//console.log("the result value is " + service);

		 				$.each(service,function(k,v){	
		 					
		 					//console.log('the service value inside the each loop' + service);

		 					serviceName     = v.service_name;	
		 					serviceDuration = v.duration;
		 					serviceCost     = v.cost;
		 					serviceKey		= v.key;
		 					staffKeys 		= v.staff_keys;
		 
		 					serviceStaffPair.push(new serviceStaff(serviceName,staffKeys));

		 					//console.log("the value is " + JSON.stringify(serviceName) +" " + JSON.stringify(serviceDuration) + " " + JSON.stringify(serviceCost) + "service key" + JSON.stringify(serviceKey)  +  "staff key" + JSON.stringify(staffKeys)); 


		 					
		 					var serviceli = document.createElement("li");
		 					serviceli.setAttribute('class','serviceLiClass');

		 					var servNameSpan = document.createElement('span');
		 					servNameSpan.setAttribute('class','servNameSpan');
		 					servNameSpan.appendChild(document.createTextNode(serviceName));
		 					serviceli.appendChild(servNameSpan);

/*
		 					var servDurSpan = document.createElement('span');
		 					servDurSpan.setAttribute('class','serviceDurSpan')
		 					servDurSpan.appendChild(document.createTextNode(serviceDuration + "mins"));
		 					serviceli.appendChild(servDurSpan);


		 					var serCostSpan = document.createElement('span');
		 					serCostSpan.setAttribute('class','serCostSpan');
		 					serCostSpan.appendChild(document.createTextNode(serviceCost + "rs"));
		 					serviceli.appendChild(serCostSpan);
*/
		 					
		 					var serviceDiv = document.getElementById('serviceList');	
		 					serviceNameul.appendChild(serviceli);
		 					serviceDiv.append(serviceNameul);

		 				});


		 		});
		 		
		 		// console.log("Service Staff Pair:  " + JSON.stringify(serviceStaffPair));
		 
		 },
		 
		 
		 failure : function(data){
			 
		 console.log('Failure function ' + data);
		 
		 }


		 });
		 
		 
	
	//End of AJAX call
	
	
	//Making AJAX call to fetch the staff

	// var liElement = $('.serviceLiClass');
	// console.log("the li element " + JSON.stringify(liElement));
	 
	// service_name = "Hair Straightening";
	
	
// var lielement = document.getElementsByClassName('serviceListClass');
// console.log("li " +JSON.stringify(lielement));
	

	 $('#serviceDiv #serviceList .serviceNameul .serviceLiClass').on("click", function(){
		
		 service_name = $(this).find('span.servNameSpan').text();
		 console.log('service_name');
		 
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