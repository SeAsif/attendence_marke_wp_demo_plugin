jQuery(document).ready(function($) {
	// Declare mark_attendence,duration
    var mark_attendence=false;
    var duration;
	
	//Some Testing data Collected from Vimeo Api response
    var data={
     "type": "video",
     "version": "1.0",
     "provider_name": "Vimeo",
     "provider_url": "https://vimeo.com/",
     "title": "My video",
     "author_name": "Sara Author",
     "author_url": "https://vimeo.com/techuser",
     "is_plus": "0",
     "account_type": "live_business",
     "html": "<iframe src=\"https://player.vimeo.com/video/286898202\" width=\"480\" height=\"360\" frameborder=\"0\" title=\"My video\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>",
     "width": 480,
     "height": 360,
     "duration": 23,
     "description": "This is my video.",
     "thumbnail_url": "https://i.vimeocdn.com/video/721904228_295x166.jpg",
     "thumbnail_width": 295,
     "thumbnail_height": 221,
     "thumbnail_url_with_play_button": "https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F721904228_295x166.jpg&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png",
     "upload_date": "2020-10-20 10:00:00",
     "video_id": 286898202,
     "uri": "/videos/286898202"
   }
   
var container = $("#vimeo"); // Find an element
container.html(data.html);   // Display data in the element


var iframe =document.querySelector('iframe'); // Find an iframe
var player= new Vimeo.Player(iframe);  // Creating  object


//Listen Video will play When user will click on play button
   player.on('play', function(){
	   
		if(mark_attendence==true){
		   if(duration==100.0){
		   mark_attendence=false;
		}else{
		   mark_attendence=true;
		}
		   
	}
});
    
	//Listen When Video is Finished
	player.on('ended', function() {
        console.log('Finished.');
    });

	//Listen When Video is paused
	  player.on('pause', function() {
         console.log('paused.');
    });
	
	// Listen When Video is in progress
	 player.on('progress', function() {
     //  console.log('progress.');
    });
       
	// Listen for timeupdate to update the time range input
   player.on('timeupdate', function(data) {
	 duration=(data.percent * 100).toFixed(1);
	 
	if(duration>11.0 && duration<12.0){
		if(mark_attendence==false){
				//Video will be auto pause
				player.pause();
				markAttendence(duration);
			}
		}
	else if(duration>20.0 && duration<21.0){
		if(mark_attendence==false){
				player.pause();
				markAttendence(duration);
			}
		}
	else if(duration>30.0 && duration<31.0){
			if(mark_attendence==false){
				player.pause();
				markAttendence(duration);
			}
		}
	else if(duration>49.0 && duration<50.0){
		if(mark_attendence==false){
				player.pause();
				markAttendence(duration);
			}
		}
	else if(duration>59.0 && duration<60.0){
		if(mark_attendence==false){
				player.pause();
				markAttendence(duration);
			}
		}
	else if(duration>69.0 && duration<70.0){
		if(mark_attendence==false){
				player.pause();
				markAttendence(duration);
			}
		}
	else{
	 
	}
	
   });

    
       
       function markAttendence(time){
		   swal({
			 title: "Confirm?",
			 text: "",
			 type: "warning",
			 showCancelButton: true,
			 confirmButtonColor: "#DD6B55",
			 confirmButtonText: "Mark Attendence",
			 cancelButtonText: "Cancel"
			 }
		   ).then(
			 function (isConfirm) {
			   if (isConfirm.value==true) {
			   ajax_marked_attaendence(time);
			   }else{
			   swal("You have cancelled!");
			   }
			 }
			 
		   );
		}
       
	// sending ajax post request
	function ajax_marked_attaendence(time){   
			$.ajax({
			type : "post",
			dataType : "json",
			url : myAjax.ajaxurl,
			data : {action: "mark_attendce",  user_id:myAjax.user_id, duration:time},
			success: function(response) {
				if(response.type == "success") {
					console.log(response);
					mark_attendence=true;
					player.play()
				}
				else {
				   swal("Your attendence is not marked");
				}
			 }
			})   
		  
		}    
       
       
       
       
   });
   