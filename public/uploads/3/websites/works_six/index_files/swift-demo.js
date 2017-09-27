/* live demo */
"use strict";
var $live_demo = true;
jQuery('.tzButton-Config').click(function(){
    if ( $live_demo == true ){
        jQuery('.livedemo').addClass('liveeff');
        $live_demo = false;
    }else{
        jQuery('.livedemo').removeClass('liveeff');
        $live_demo = true;
    }
});
if(readCookie('tz_sitecolor')){
    jQuery('body').addClass(readCookie('tz_sitecolor'));
}
jQuery('.iconclick').click(function(){
    var $addClass = jQuery(this).attr('data-option-value');
    jQuery('.iconclick').removeClass('iactive');
    jQuery(this).addClass('iactive');
    createCookie('tz_sitecolor',$addClass);
    jQuery('body').removeClass('themecolor-yellow');
    jQuery('body').removeClass('themecolor-blue');
    jQuery('body').removeClass('themecolor-green');
    jQuery('body').removeClass('themecolor-orange');
    jQuery('body').removeClass('themecolor-pink');
    jQuery('body').removeClass('themecolor-limegreen');
    jQuery('body').removeClass('themecolor-violet');
    jQuery('body').removeClass('themecolor-blueviolet');
    jQuery('body').removeClass('themecolor-firebrick');
    jQuery('body').removeClass('themecolor-skyblue');
    jQuery('body').removeClass('themecolor-red');
    jQuery('body').removeClass('themecolor-darkblue');
    jQuery('body').addClass($addClass);
});

if(readCookie('tz_themeremoveb')){
    jQuery('body').removeClass(readCookie('tz_themeremoveb'))
}
jQuery('.fullbox').click(function(){
    eraseCookie('tz_themeb');
    jQuery('.livebox li').removeClass('lactive');
    jQuery(this).addClass('lactive');
    var $name = 'theme-box';
    createCookie('tz_themeremoveb',$name);
    jQuery('body').removeClass($name);
    jQuery('.live-bkcontro').slideUp();
    if (typeof tz_init == 'function') {
        tz_init();
    }

});


if(readCookie('tz_themeb')){

    jQuery('body').addClass(readCookie('tz_themeb'));
}
jQuery('.lboxed').click(function(){
    eraseCookie('tz_themeremoveb');
    jQuery('.livebox li').removeClass('lactive');
    jQuery(this).addClass('lactive');
    var $name = 'theme-box';
    createCookie('tz_themeb',$name);
    jQuery('body').addClass($name);
    jQuery('.live-bkcontro').slideDown();
    if (typeof tz_init == 'function') {
        tz_init();
    }
});
if ( jQuery('.theme-box').length > 0 ){
    jQuery('.live-bkcontro').css('display','block');
    jQuery('.lboxed').addClass('lactive');
}
jQuery('.live-patterns li').click(function(){
    jQuery('.live-patterns li').removeClass('iactive2');
    jQuery(this).addClass('iactive2');
    var $img = jQuery(this).attr('data-option-text');
    var $name = 'url('+imgpath+$img+')';
    createCookie('tz_bkpath',$name);
    jQuery('body#bd').css({
        'background-image':$name
    });
});

if(readCookie('tz_bkpath')){
    jQuery('body#bd').css({
        'background-image':readCookie('tz_bkpath')
    });
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}
