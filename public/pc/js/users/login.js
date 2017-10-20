var backstretch = require('../../../plugins/jquery.backstretch.min');
/*
 Fullscreen background
 */
$.backstretch("assets/img/backgrounds/1.jpg");

/*
 Form validation
 */
$('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    $(this).removeClass('input-error');
});

$('.login-form').on('submit', function(e) {

    $(this).find('input[type="text"], input[type="password"], textarea').each(function(){
        if( $(this).val() == "" ) {
            e.preventDefault();
            $(this).addClass('input-error');
        }
        else {
            $(this).removeClass('input-error');
        }
    });

});

var errorTips = $('.alert-danger');
if(errorTips.length > 0){
    setTimeout(function(){
        errorTips.animate({
            'top': '-100px',
            'opacity': 0
        }, 1000, function(){
            errorTips.remove();
        });
    }, 2000);
}