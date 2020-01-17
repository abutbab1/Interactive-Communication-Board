
$(document).ready(function(){

    var hc = new HomeController();
    var av = new AccountValidator();
    var that = this;

    var touch 	= $('#resp-menu');
    var menu 	= $('.menu');

    $('#account-form').ajaxForm({
        success	: function(responseText, status, xhr, $form){
            if (status == 'success') $('.modal-alert').modal('show');
        }
    });

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

// customize the account signup form //

    $('#account-form h2').text('My Companions: ');
    $('#account-form #sub').text('Please select the companion you want to move to his board');
    $('#account-form-btn1').html('Cancel');
    $('#account-form-btn2').html('Connect');
    $('#account-form-btn1').click(function(){ window.location.href = '/';});

// setup the alert that displays when an account is successfully created //

    $('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
    $('.modal-alert .modal-header h4').text('Switch to Companion!');
    $('.modal-alert .modal-body p').html('You are logged in to your Companion.</br>Click OK to switch to the home page of the companion.');
    $('.modal-alert button').click(function(){window.location.href = '/home';});

// setup the confirm window that displays when the user chooses to logout //

    $('#btn-logout').click(function(){$('.modal-logout').modal('show')});
    $('.modal-logout .submit').click(function(){ that.attemptLogout(); });

    $('.modal-logout').modal({ show : false, keyboard : true, backdrop : true });
    $('.modal-logout .modal-header h4').text('Sign Out');
    $('.modal-logout .modal-body p').html('Are you sure you want to logout?');
    $('.modal-logout .cancel').html('No');
    $('.modal-logout .submit').html('Yes');
    $('.modal-logout .submit').addClass('btn-danger');


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

    this.showLogoutAlert = function(msg){
        $('.modal-logout').modal({ show : false, keyboard : false, backdrop : 'static' });
        $('.modal-logout .modal-body p').html(msg);
        $('.modal-logout').modal('show');
        setTimeout(function(){window.location.href = '/';}, 10);
    }

});