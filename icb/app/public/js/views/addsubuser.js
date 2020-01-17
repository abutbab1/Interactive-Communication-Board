
$(document).ready(function(){

    var av = new AccountValidator();
    var sc = new SignupController();

    var that = this;

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
            return av.validateForm();
        },
        success	: function(responseText, status, xhr, $form){
            if (status == 'success') $('.modal-alert').modal('show');
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

// customize the account signup form //

    $('#account-form h2').text('Create Sub User (Companion)');
    $('#account-form #sub').text('Please fill in the details of the companion');
    $('#class-list').attr('disabled', 'disabled');
    $('#account-form-btn1').html('Cancel');
    $('#account-form-btn2').html('Create');
    //$('#account-form-btn2').addClass('btn-primary');

// setup the alert that displays when an account is successfully created //

    $('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
    $('.modal-alert .modal-header h4').text('Account Created!');
    $('.modal-alert .modal-body p').html('Sub account has been created.</br>Click OK to return to the home page.');

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