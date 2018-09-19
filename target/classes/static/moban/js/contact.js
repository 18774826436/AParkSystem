/* Author: Matt Hamm Supereight Studio */

// Contact form submission and validation
$(function() {  

	$("#contact-form .submit").click(function() { 
	// validate and process form here
	
		required = ["message", "name", "email"];
		message = $("#message");
		name = $("#name");
		email = $("#email");
		errornotice = $("#error");
		emptyerror = "Please fill out this field.";
		emailerror = "Please enter a valid email";
		
		ajaxMessage = $("#message").val();
		ajaxName = $("#name").val();
		ajaxEmail = $("#email").val();
		ajaxPhone = $("#phonenumber").val();		
		
		dataString = 'message='+ ajaxMessage + '&name=' + ajaxName + '&email=' + ajaxEmail + '&phonenumber=' + ajaxPhone;
	
		//Validate required fields
		for (i=0;i<required.length;i++) {
			var input = $('#'+required[i]);
			if ((input.val() == "") || (input.val() == emptyerror)) {
				input.addClass("needsfilled");
				input.val(emptyerror);
			} else {
				input.removeClass("needsfilled");
			}
		}
		
		// Validate the e-mail.
		if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
			email.addClass("needsfilled");
			email.val(emailerror);
		}
		
		//if any inputs on the page have the class 'needsfilled' the form will not submit
		if ($(":input").hasClass("needsfilled")) {
			return false;
		} else {
			// Process form with AJAX
			$.ajax({  
			  type: "POST",  
			  url: "bin/process.php",  
			  data: dataString,  
			  success: function() {  
			    $('#contact-form-wrapper').html("<div id='thanks'></div>");  
			    $('#thanks').html("<img src='img/postmark.png' /><h2>Speak to you soon.</h2>")  
			    .hide()  
			    .fadeIn(1500, function() {  
			      $('#thanks');  
			    });  
			  }  
			});
			return false;
		}

	});
	
	// Clears any fields in the form when the user clicks on them
	$(":input").focus(function(){		
	   if ($(this).hasClass("needsfilled") ) {
			$(this).val("");
			$(this).removeClass("needsfilled");
	   }
	});
	
});

runOnLoad(function(){
  $("textarea#message").select().focus();
});



