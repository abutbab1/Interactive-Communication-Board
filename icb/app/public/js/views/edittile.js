$(document).ready(function(){

    const recordAudio = () =>
        new Promise(async resolve => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];
            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });
            const start = () => {
                audioChunks = [];
                mediaRecorder.start();
            };
            const stop = () =>
                new Promise(resolve => {
                    mediaRecorder.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        const play = () => audio.play();
                        resolve({ audioChunks, audioBlob, audioUrl, play });
                    });
                    mediaRecorder.stop();
                });
            resolve({ start, stop });
        });
    const recordButton = document.querySelector('#record');
    const stopButton = document.querySelector('#stop');
    const playButton = document.querySelector('#play');
    //const saveButton = document.querySelector('#save');
    let recorder;
    let audio;
    recordButton.addEventListener('click', async () => {
        recordButton.setAttribute('disabled', true);
        stopButton.removeAttribute('disabled');
        playButton.setAttribute('disabled', true);
        if (!recorder) {
            recorder = await recordAudio();
        }
        recorder.start();
        setTimeout(function (){ Buttonstop()}, 5000);
    });

    async function Buttonstop()
    {
        recordButton.removeAttribute('disabled');
        stopButton.setAttribute('disabled', true);
        playButton.removeAttribute('disabled');
        audio = await recorder.stop();
        const reader = new FileReader();
        reader.readAsDataURL(audio.audioBlob);
        reader.onload = () => {
            const base64AudioMessage = reader.result.split(',')[1];
            var inner = "<input type='text' name='sound' id='sound' hidden value="+base64AudioMessage+">";
            document.getElementById('sound').innerHTML = inner;
        };
    }

    stopButton.addEventListener('click', async () => {
        recordButton.removeAttribute('disabled');
        stopButton.setAttribute('disabled', true);
        playButton.removeAttribute('disabled');
        audio = await recorder.stop();
        const reader = new FileReader();
        reader.readAsDataURL(audio.audioBlob);
        reader.onload = () => {
            const base64AudioMessage = reader.result.split(',')[1];
            var inner = "<input type='text' name='sound' id='sound' hidden value="+base64AudioMessage+">";
            document.getElementById('sound').innerHTML = inner;
        };
    });
    playButton.addEventListener('click', () => {
        audio.play();
    });

    var av = new AccountValidator();
    var that = this;

    var touch 	= $('#resp-menu');
    var menu 	= $('.menu');

    $('#account-form').ajaxForm({
        error : function(e){
            if (e.responseText == 'title-empty'){
                av.showInvalidTitle('Please Enter Title for the tile.');
            }
        },
        success	: function(responseText, status, xhr, $form){
            if (status == 'success')
                that.showTileAlert('Tile has been edited!.</br>Click OK to return to the home page.');
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

    $('#account-form h2').text('Edit Tile');
    $('#account-form #sub').text('Please fill in the details of the Tile');
    $('#account-form-btn1').html('Cancel');
    $('#account-form-btn2').html('Edit');
    $('#account-form-btn1').click(function(){ window.location.href = '/';});

// setup the alert that displays when an phrase is successfully created //

    this.showTileAlert = function(msg){
        $('.modal-alert').modal({ show:false, keyboar : false, backdrop : 'static' });
        $('.modal-alert .modal-header h4').text('Tile Edited!');
        $('.modal-alert .modal-body p').html(msg);
        $('.modal-alert').modal('show');
        $('.modal-alert button').off('click');
        $('.modal-alert button').click(function(){window.location.href = '/';});
        setTimeout(function(){window.location.href = '/';}, 3000);
    };
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