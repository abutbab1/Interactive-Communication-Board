
$(document).ready(function(){
	var hc = new HomeController();
	var av = new AccountValidator();

	var touch 	= $('#resp-menu');
	var menu 	= $('.menu');

	$(touch).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle();
	});

	$(window).resize(function(){
		var w = $(window).width();
		if(w > 767 && menu.is(':hidden')) {
			menu.removeAttr('style');
		}
	});

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (av.validateForm() == false){
				return false;
			} 	else{
			// push the disabled username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') hc.onUpdateSuccess();
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();

// customize the account settings form //

	$('#account-form h2').text('Account Settings');
	$('#account-form #sub').text('Here are the current settings for your account.');
	$('#user-tf').attr('disabled', 'disabled');
	$('#class-list').attr('disabled', 'disabled');
	$('#account-form-btn1').html('Delete');
	$('#account-form-btn1').removeClass('btn-outline-dark');
	$('#account-form-btn1').addClass('btn-danger');
	$('#account-form-btn2').html('Update');

// setup the confirm window that displays when the user chooses to delete their account //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h4').text('Delete Account');
	$('.modal-confirm .modal-body p').html('Are you sure you want to delete your account?');
	$('.modal-confirm .cancel').html('Cancel');
	$('.modal-confirm .submit').html('Delete');
	$('.modal-confirm .submit').addClass('btn-danger');


// setup the confirm window that displays when the user chooses to delete their tiles //
	$('.modal-delete-tile').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-delete-tile .modal-header h4').text('Delete Tile');
	$('.modal-delete-tile .modal-body p').html('Are you sure you want to delete this tiles?');
	$('.modal-delete-tile .cancel').html('Cancel');
	$('.modal-delete-tile .submit').html('Delete');
	$('.modal-delete-tile .submit').addClass('btn-danger');

// setup the confirm window that displays when the user chooses to logout //

	$('.modal-logout').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-logout .modal-header h4').text('Sign Out');
	$('.modal-logout .modal-body p').html('Are you sure you want to logout?');
	$('.modal-logout .cancel').html('No');
	$('.modal-logout .submit').html('Yes');
	$('.modal-logout .submit').addClass('btn-danger');

});

function myTnTool( action, item ) {										// custom button switch
	console.dir(item);
	switch( action ) {
		case 'custom1':
			SoundCustom(item);
			break;
	}
}

async function SoundCustom(item){
	var text = item.title;
	if('speechSynthesis' in window) { 											// Chrome only
		var speech = new SpeechSynthesisUtterance( text );
		speech.lang = 'en-US';
		window.speechSynthesis.speak(speech);
	}
	else
	{
		text = encodeURIComponent(text);
		var audio = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q='+text);
		audio.type = 'audio/mpeg';

		try {
			await audio.play();
			console.log('Playing...');
		} catch (err) {
			console.log('Failed to play...' + error);
		}
	}
}

(function($){

	// A collection of elements to which the tripleclick event is bound.
	var elems = $([]),

		// Initialize the clicks counter and last-clicked timestamp.
		clicks = 0,
		last = 0;

	// Click speed threshold, defaults to 500.
	$.tripleclickThreshold = 500;

	// Special event definition.
	$.event.special.tripleclick = {
		setup: function(){
			// Add this element to the internal collection.
			elems = elems.add( this );

			// If this is the first element to which the event has been bound,
			// bind a handler to document to catch all 'click' events.
			if ( elems.length === 1 ) {
				$(document).bind( 'click', click_handler );
			}
		},
		teardown: function(){
			// Remove this element from the internal collection.
			elems = elems.not( this );

			// If this is the last element removed, remove the document 'click'
			// event handler that "powers" this special event.
			if ( elems.length === 0 ) {
				$(document).unbind( 'click', click_handler );
			}
		}
	};

	// This function is executed every time an element is clicked.
	function click_handler( event ) {
		var elem = $(event.target);

		// If more than `threshold` time has passed since the last click, reset
		// the clicks counter.
		if ( event.timeStamp - last > $.tripleclickThreshold ) {
			clicks = 0;
		}

		// Update the last-clicked timestamp.
		last = event.timeStamp;

		// Increment the clicks counter. If the counter has reached 3, trigger
		// the "tripleclick" event and reset the clicks counter to 0. Trigger
		// bound handlers using triggerHandler so the event doesn't propagate.
		if ( ++clicks === 3 ) {
			elem.trigger( 'tripleclick' );
			clicks = 0;
		}
	};

})(jQuery);

$(function()
{
	if(localStorage.getItem("tripleClickState")=="0"){
		$(".bannerContainer").show();
	}else{
		$(".bannerContainer").hide();
	}

	$("#SNLCK").on("tripleclick", function()
	{
		$(".bannerContainer").toggle();
		$(".editContainer").hide();
		if($('#my_nanogallery2').nanogallery2('option', 'thumbnailSelectable') == true)
			$('#my_nanogallery2').nanogallery2('option', 'thumbnailSelectable', false);

		// store a value to local storage;
		if(localStorage.getItem("tripleClickState")=="0"){
			localStorage.setItem("tripleClickState", "1");
		}else{
			localStorage.setItem("tripleClickState", "0");
		}
	});

});


