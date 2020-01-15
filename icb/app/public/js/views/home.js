
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



