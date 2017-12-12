$(document).ready(function(){
	
	$('#loader').hide();
	$('#customerForm').hide();
	$('#appointmentConfirmation').hide();
	
	var customerKey;
	var service_duration;
	var startTime;
	var endTime;
	
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
	  		slotUl = $('#slotsUl');	
	  		
	  		if($('#slotsUl li').hasClass('slotsLi')){
			    slotUl.empty();
	  		}else if($('#slotsUl li').hasClass('noSlots')){
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
		 					 $('<option />', {id: serviceDuration , value: serviceKey , text: serviceName , class :'optionClassName'}).appendTo(serviceSelect);
		 					 
		 					 
		 				});
		 				
		 		});
		 		
		 		serviceSelect.appendTo(serviceDiv);
		 		
		 		
	   
   }
   
 //Function to show the staff list
 		 	
   function populateStaffDropdown(){
	   
	   
	   $('#loader').show();
 		
 		$('#selectStaff').find('option[value!="all"]').remove();
      
 		service_name = $("#selectService option:selected").text();
		console.log("service selected = " + service_name);
			
			$.ajax({
				
			    type        :  'GET',
				url         :  '/bookingpage/staff',
				dataType    :  'json',
				async		:	false,
				success     :  function(data){
					         
					         $('#loader').hide();
					         
					           staffResponse = JSON.stringify(data);
								
					           var staffKeysAndServiceDuration = getStaffKeysAndServiceDuration();
					    	   
					    	   var service_staff_keys  = staffKeysAndServiceDuration[0];
					           
					    	  
                              
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
									
								
									console.log("staffDetails after pushing " + staffDetails);
								 });	
                                
                                
						},
											
					failure     :  function(data){
									  $('#loader').hide();
									  console.log('Failure function: ' + data);
												           
									}

			});
			
   }
   
   //function to display the slots
   
   function displaySlots(){
	   
	   var eachStaffName;
	   selected_date = $("#datePicker").val()+"";
	   
	   var staffKeysAndServiceDuration = getStaffKeysAndServiceDuration();
	   
	   service_duration = $("#selectService option:selected").attr('id');
	   $('#loader').show();

	   
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
				
				//Making AJAX call to get the time slots for all staffs
				
				$.ajax({
	 		 		url   :'/bookingpage/allstaffslots',   
	 		 		type  : 'POST',
		        	contentType :'application/json',
		        	data : JSON.stringify(inputValues),
		        	   
		        	   success : function(result){
		        		
		        		   $('#loader').hide();

		        		   var slotResponse = JSON.parse(result);
		        		   console.log("slotResponse = " + slotResponse);
		        		 
		        		   let availableSlots = JSON.parse(slotResponse.msg);
		        		  
		        		   if($.isEmptyObject(availableSlots)){
		        			   
		        			   var date = $("#datePicker").datepicker('getDate');
		        			      if (date) {
		        			            date.setDate(date.getDate() + 1);
		        			      }
		        			      $("#datePicker").datepicker('setDate', date);
		        			      displaySlots();

		        			 
		        		   }
		        		   else{
		        			 
		        			  
		        		  
		        			   $.each(availableSlots , function(key,value){
		        			 
		        			   eachStaffKey = key;
		        			   console.log(key);
		        			   var staffname = $('<ul></ul>').addClass('staffNameUl');
		        			   console.log("the staff details iside else " +staffDetails );
		        			 
		        			   $.each(staffDetails, function(index,v){
		     
		        				   console.log(" the vallue of v is " + v);
		        					  if(v.staffKey == eachStaffKey){
		        						  
		        						  var eachStaffName = v.staffName;
		        						  var slotUl  = $('#slotsUl');	
		  
		        						  var li = $('<li></li>').addClass('staffLi');
		        						  li.text(eachStaffName);
		        						  //staffname.text(eachStaffName);
		        						  li.appendTo(staffname);
		        						  staffname.appendTo(slotUl);
		    		        			
		    		        			  staffname.attr('id',eachStaffKey);
		    		        			 // staffname.attr("style","list-style: none;");
		    				        		console.log('the staff name iss' +JSON.stringify(eachStaffName));

		        					  }
		        					  
		        			  });
		        			  
		        			
		        			//Looping through each staff slots
		        			  
		        			  for (var key in value) {
		        				    
		        				    if (value.hasOwnProperty(key)) {           
		        				        console.log(value[key]);
		        				        var timeZoneVal  = value[key];
		        				        var slotUl  = $('#slotsUl');	
		  		        			var  slot = $('<li></li>').addClass('slotsLi');
		  		        			
				        			  slot.text(moment.tz(timeZoneVal,timeZone).format("hh:mm a"));
				        			  slot.attr('id',timeZoneVal);
				        			  slot.appendTo(staffname);
				        			  staffname.appendTo(slotUl);
				        			  
				        			 
				        			  
		  		        			   
		        				    }
		        				  
		        				}
		        			  
		        			  
		        		   });
		        		   }   
		        		   
		        	   }, 
		        	   
		        	   error : function(xhr, status, error){
		        		   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
		        		   $('#loader').hide();

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
		        		   $('#loader').hide();

		        		   console.log("The slot response " + result);
		        		   var slotResponse = JSON.parse(result);
		        		   let availableSlots = JSON.parse(slotResponse.msg);
		        		   
		        		   if(availableSlots == null){
		        			 
		        			   var date = $("#datePicker").datepicker('getDate');
		        			      if (date) {
		        			            date.setDate(date.getDate() + 1);
		        			      }
		        			      $("#datePicker").datepicker('setDate', date);
		        			      displaySlots();
		        			      
		        			   
		        		   }else{
		        		 
		        		   $.each(availableSlots , function(index,value){
		        			  
		        			   console.log( moment.tz(value,timeZone).format("hh:mm a"));
		        			   
		        			  slot = $('<li></li>').addClass('slotsLi');
		        			  slot.text(moment.tz(value,timeZone).format("hh:mm a"));
		        			  slot.attr('id',value);
		        			  slot.appendTo(slotsUl);

		        		   });
		        		   
		        		   }
		        	   }, 
		        	   
		        	   error : function(xhr, status, error){
		        		   	   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
		        		   	   $('#loader').hide();

		        	   }
	 		 	
	 		 	});
				
			}
		
   }
   
   
  
   
   //Function to create/get the customer key
   
   function createContact (inputValues){
   
	   $('#loader').show();
	   $('#customerForm').hide();
	   
	   var firstName = $('#firstName').val();
	   var lastName  = $('#lastName').val();
	   var email     = $('#email').val();
	   
	   
	   if(firstName == "" || null){
		var li =    $("<li>").text("please enter your first name");
	    
	   }else if(email == " " ||null){
		   var li =    $("<li>").text("please enter your email address");
	   }
	  
	   var inputValues = {
			     
			      'first_name':firstName+"",      
		          'last_name': lastName+"",    
		          'email_id':email+""
			   
	   };
   
	   $.ajax({
		
		type     : "POST",
		url      : "/bookingpage/createContact",
		contentType :"application/json",
		data     :JSON.stringify(inputValues),
		success  : function(response){
			
			var customer_response = JSON.parse(response);
			console.log("customer created " + JSON.stringify(response));
			
			$.each(customer_response,function(key,value){  
				 
				if(key =='data'){
				 var customer =  value.customer;
			 
				$.each(customer,function(k,v){ 
				
			    if( k =='key'){
				customerKey = v+"" ; 
				console.log(customerKey);
			    }
				});
				 
				 }

				});
			$('#loader').hide();
			confirmAppointmentDetails();
			 
			
			},
	    error : function(response){
	    	console.log('customer not created and throws error ' + JSON.stringify(response))
	    	 $('#loader').hide();
	    }
			
   
		});
   
   }
   
   
   //function to confirm appointment details
   
   function confirmAppointmentDetails(){
	   
	   $('#serviceName').text($("#selectService option:selected").text());
	   
	   
	   if( $("#selectStaff option:selected").val() != "all"){
		   $('#staffName').text($("#selectStaff option:selected").text());
	   }else{
		   $('#staffName').text(selectedStaffName);
	   }
	   
	   $('#appointmentTime').text(moment.tz(parseInt(startTime),timeZone).format("YYYY-MM-DD hh:mm a"));
	   
	   $('#yourInfo').text( $('#firstName').val() + "\n" + $('#lastName').val() + "\n" + $('#email').val() );
	   
	   $('#appointmentConfirmation').show();
	   
   }
   
   //function to book appointment
   
   function bookAppointment(){
	   

	   var servicekey = $("#selectService option:selected").val()+"";
	   console.log("servicekey = " + servicekey);
	   
	   console.log("customer key = " + customerKey);
	   
	   
	   if( $("#selectStaff option:selected").val() != "all"){
		   staff_key_value = $("#selectStaff option:selected").val()+"";
	   }else{
		   staff_key_value = selectedStaffKey;
	   }
	   
	   console.log("staff key = "+ staff_key_value );
	   console.log("ser duration = " + service_duration);
	   endTime = parseInt(startTime)+parseInt((service_duration*60*1000));
	   console.log("start time of the appt is = " + startTime );
	   console.log("End time of the appt is = " + endTime );
	   /*
	   var x = new Date(parseInt(startTime));
	   console.log("x = " + x);
	   var startTimeValue = x.toISOString();
	   console.log("startTimeValue = " + startTimeValue);
	   
	   var y = new Date(parseInt(endTime));
	   console.log("y = " + y);
	   var endTimeValue = y.toISOString();
	   console.log("endTimeValue = " + endTimeValue);
	   */
	   startTimeValue = (moment.tz(parseInt(startTime),timeZone).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
	   console.log("start time of the appt is : " + startTimeValue );
	   
	   endTimeValue = (moment.tz(parseInt(endTime),timeZone).format("YYYY-MM-DDTHH:mm:ss.sssZ"));
	   console.log("end time of the appt is : " + endTimeValue );
	   
	   var inputValues = {
		          "staff_key" : staff_key_value,      
		          "service_key" : servicekey,      
		          "customer_key" : customerKey,  
		          "start_time" : startTimeValue,     
		          "end_time"  : endTimeValue
		      };
	   
	   
	   $.ajax({
		   	type     : "POST",
			url      : "/bookingpage/bookAppointment",
			contentType :"application/json",
			data     :JSON.stringify(inputValues),
			success  : function(){
				
			},
			error    : function(){
				
			}
	   });
	   
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
			
			
			geocoder = new google.maps.Geocoder();
		
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK)
			  {
				  
				  $('#company-address').text(address);
				  $('#company-address').show();
			      
			      latitude   =  results[0].geometry.location.lat();
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
			     
			  }else{
				  var mapOptions = {
							zoom: 2,
							center: new google.maps.LatLng(0,0),
							mapTypeId: google.maps.MapTypeId.ROADMAP
							}
				  
							var map    = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
				  
							
			  }
			})
			
			populateServiceDropdown();
			populateStaffDropdown();
			displaySlots();
			
		},
		failure  : function(){
				   console.log("inside failure function");
		}
	});
		
	}
   
	
   
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
   
   
 
   $('#selectStaff').change(displaySlots);
   
   
   $('#selectService').change(function(){
	   populateStaffDropdown();
	   displaySlots();
   });
   
   
   $('#slotsUl').on('click','li',function(){
	   $('#availableSlots').hide();
	  startTime = $(this).attr('id');
	  if($("#selectStaff option:selected").val() == "all"){
		  selectedStaffKey = $(this).parent().attr('id');
		  selectedStaffName = $(this).parent().attr('text');
	  }
	   $('#customerForm').show();
	  console.log('the value of slots li under the click function is ' + startTime );
   });
   
   $('#customerSubmit').on('click',function(){
	   createContact();
   });
   
   $('#bookAppointment').on('click',function(){
   bookAppointment();
   });
   
   
}); 
