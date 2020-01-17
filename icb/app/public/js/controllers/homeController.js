
function HomeController()
{

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){$('.modal-logout').modal('show')});
	$('.modal-logout .submit').click(function(){ that.attemptLogout(); });

// confirm account deletion //
	$('#account-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle account deletion //
	$('.modal-confirm .submit').click(function(){ that.deleteAccount(); });

// confirm tile deletion //
	$('#delete-tile').click(function(){
		var ngy2data = $("#my_nanogallery2").nanogallery2('data');
		var i=0;
		ngy2data.items.forEach( function(item) {
			if( item.selected ) {
				i++
			}
		});
		if(i>0)
			$('.modal-delete-tile').modal('show');
		else
		{
			$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
			$('.modal-alert .modal-header h4').text('Deletion Error!');
			$('.modal-alert .modal-body p').html('No selected tile! <br> Please select tile before deleting.');
			$('.modal-alert').modal('show');
			$('.modal-alert button').off('click');
		}
	});

	$('#INFO').click(function(){
		$('.modal-info').modal({ keyboard : false, backdrop : 'static' });
		$('.modal-info .modal-header h4').html('<i class="image"></i><i style="font-size:30px; color: #6198fd" class="far fa-question-circle"></i>'+'<i style="font-size:38px; color: #6198fd"><b>    <u>information!</u></b></i>');
		$('.modal-info .modal-body p').html(
			'<script>' +
			'$(document).ready(function(){' +
			'    $("#myTooltips a").tooltip({' +
			'        template : \'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-head"></div><div class="tooltip-inner"></div></div>\'' +
			'    });' +
			'});' +
			'</script>'+
			'<i style="font-size:16px; color: #6198fd"><b><u>What is communication board?</u></b></i>' +
			'<br>Communication board is a platform for those who may not be able to communicate using their voice.' +
			'<br>These types of boards are extremely important when your loved ones have difficulty communicating for any reason.' +
			'<br>ICB will allow the patient to not only communicate with loved ones, they will also allow the patient to express themselves and communicate with the society.' +
			'<br>' +
			'<br>'+
			'<i style="font-size:16px; color: #6198fd"><b><u>how to use:</u></b></i>'+'<br>'+'<br>'+
			'<table class="table table-bordered" style="width: 100%;">' +
			'    <thead>' +
			'        <tr>' +
			'            <th style=\'width:10%\'>Icon</th>' +
			'            <th>Use</th>' +
			'        </tr>' +
			'    </thead>' +
			'<tbody>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="HOME"><i style="font-size:30px; color:#fff" class="fa fa-home"></i></a></div></td>' +
			'        <td>Press this icon to go to your personal communication board.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Play recording / Text to Speech"><i style="font-size:24px; color:#fff" class="fas fa-volume-up"></i></a></div></td>' +
			'        <td>Press this icon to hear the recording (if there is no recording you will hear the text to speech).</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Add Phrase"><i style="font-size:24px; color:#fff" class="far fa-plus-square"></i></a></div></td>' +
			'        <td>Press this icon to add new phrase to your communication board.</td>' +
			'    <tr>' +
			'        <td style="text-align:center; background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Add Category"><i style="font-size:24px; color:#fff" class="fa fa-sitemap"></i></a></div></td>' +
			'        <td>Press this icon to add new category to your communication board.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Select Tiles"><i style="font-size:30px; color:#fff" class="far fa-check-square"></i></a></div></td>' +
			'        <td>Press this icon to select tiles.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Not Selected"><i style="font-size:30px; color:#fff" class="fa fa-square-o"></i></a></div></td>' +
			'        <td>This icon indicates that the tile is yet to be chosen.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Selected"><i style="font-size:30px; color:#fff" class="fa fa-check-square-o"></i></a></div></td>' +
			'        <td>This icon indicates that the tile is chosen.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Edit Tile"><i style="font-size:24px; color:#fff" class="far fa-edit"></i></a></div></td>' +
			'        <td>Press this icon to edit the chosen tile (only one at a time).</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Delete Tiles"><i style="font-size:30px; color:#fff" class="fa fa-trash"></i></a></div></td>' +
			'        <td>Press this icon to delete the chosen tiles (can be many tiles at a time).</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Special Needs Lock"><i style="font-size:30px; color:#fff" class="fa fa-lock"></i></a></div></td>' +
			'        <td>Press this icon 3 times to enter and exit SN mode (this mode is a "safe mode" so that the communication board can\'t be edited).</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Edit User"><i style="font-size:24px; color:#fff" class="far fa-address-card"></i></a></div></td>' +
			'        <td>Press this icon to edit your account information.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Logout"><i style="font-size:30px; color:#fff" class="fa fa-sign-out"></i></a></div></td>' +
			'        <td>Press this icon to log out from your account.</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Album Content"><i style="font-size:24px; color:#fff" class="nGY2Icon-picture"></i></a></div></td>' +
			'        <td>The number on the right of this icon, is the number of phrases in a category.</td>' +
			'    <tr>' +
			'            <th style="text-align:center; width:100%" colspan="2">Specific for Speech Therapistsh</th>' +
			'    </tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Users"><i style="font-size:30px; color:#fff" class="fa fa-users"></i></a></div></td>' +
			'        <td>Press this icon to see your team of Companions (and log into their accounts).</td>' +
			'    <tr>' +
			'        <td style="text-align:center;background:#6198fd"><i class="image"></i><div id="myTooltips"><a type="button" data-toggle="tooltip" data-placement="top" title="Add user"><i style="font-size:24px; color:#fff" class="fa fa-user-plus"></i></a></div></td>' +
			'        <td>Press this icon to add a Companion to your team.</td>' +
			'    <tr>' +
			'</tbody>' +
			'</table>'+
		'<br>Now all thats left to do, is to sit down and talk!');
		$('.modal-info').modal('show');
		$('.modal-info button').off('click');
	});

	// error edit tile //
	$('#edit-tile').click(function(){
		var ngy2data = $("#my_nanogallery2").nanogallery2('data');
		var i=0;
		var newitem;
		ngy2data.items.forEach( function(item) {
			if( item.selected ) {
				newitem = item.GetID();
				i++;
			}
		});
		if(i==0)
		{
			$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
			$('.modal-alert .modal-header h4').text('Edition Error!');
			$('.modal-alert .modal-body p').html('No selected tile! <br> Please select tile before editing.');
			$('.modal-alert').modal('show');
			$('.modal-alert button').off('click');
		}
		else if(i==1)
		{
			console.log(newitem);
			$.ajax({
				url: '/home',
				type: 'post',
				data: { tileid : newitem},
				success: function(data){
					window.location.href = '/edittile';
				},
			});
		}
		else
		{
			$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
			$('.modal-alert .modal-header h4').text('Edition Error!');
			$('.modal-alert .modal-body p').html('Too many tiles! <br> Only <u><b>one</b></u> tile can be edited at the time.');
			$('.modal-alert').modal('show');
			$('.modal-alert button').off('click');
		}
	});

// handle tile deletion //
	$('.modal-delete-tile .submit').click(function(){ that.deleteTile(); });


	this.deleteTile = function()
	{
		var ngy2data = $("#my_nanogallery2").nanogallery2('data');
		$('.modal-delete-tile').modal('hide');
		var that = this;
		var itemarray = [];
		ngy2data.items.forEach( function(item) {
			if( item.selected ) {
				item.delete();
				itemarray.push(item.GetID());
			}
		});
		if(itemarray.length > 0)
		{
			$("#my_nanogallery2").nanogallery2('resize');
			$.ajax({
				url: '/deletetile',
				type: 'POST',
				data: { tileid : itemarray },
				error: function(jqXHR){
					console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
				}
			});
		}
	};


	this.deleteAccount = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			success: function(data){
				that.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		$('.modal-logout').modal('hide');
		var that = this;
		$.ajax({
			url: '/logout',
			type: 'POST',
			data: {logout : true},
			success: function(data){
	 			that.showLogoutAlert('Are you sure you want to signout?');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h4').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';});
		setTimeout(function(){window.location.href = '/';}, 3000);
	}

	this.showLogoutAlert = function(msg){
		$('.modal-logout').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-logout .modal-body p').html(msg);
		$('.modal-logout').modal('show');
		setTimeout(function(){window.location.href = '/';}, 10);
	}
}

HomeController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h4').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
	$('.modal-alert button').click(function(){window.location.href = '/';})
}
