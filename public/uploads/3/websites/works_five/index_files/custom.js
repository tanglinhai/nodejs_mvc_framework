
var $wp     = true;
var $joomla = true;
var $html    = true;
jQuery(document).ready(function(){

    "use strict";
    var $heightW     = jQuery(window).height();
    var $windowW     = jQuery(window).width();
    var $heghtWindow = $heightW - 44;
    jQuery('.tzwrap_content').css('height',$heightW+'px');
    var $heightIntro = jQuery('.tzintro-content').height();
    var $heightTop   = ( $heghtWindow - $heightIntro + 43 ) / 2;
    jQuery('.tzintro-content').css('padding-top', $heightTop + 'px');
    jQuery('.tzintro-icon span').hide();
    jQuery('.tzintro-icon span:first').show();
    setInterval(function(){
        jQuery('.tzintro-icon span:first').fadeOut(100).next('span').fadeIn(100).end().appendTo('.tzintro-icon') ;
    },2000) ;

    jQuery('#tziframe').css({
        'margin-top': '44px',
        height: $heghtWindow + 'px'
    });
    jQuery('.tzplus').click(function(){
        jQuery('#tziframe').css({
            'margin-top': '44px',
            height: $heghtWindow + 'px'
        });
       jQuery('.tznavigation').removeClass('tzremove');
        jQuery('.tzplus').removeClass('tzourplus');
    });


    jQuery('.content').on('click',function(){
        jQuery('.tzbuynow a').hide();
        jQuery('.linkdetail').css('display','block');
        jQuery('.tzplus-wrap').removeClass('tzpluss');
        var $param  = jQuery(this).parent();
        var $url    = $param.attr('data-option-url');
        jQuery('.item').addClass('tzitem');
        jQuery('.tzintro-content').hide();
        setTimeout(function(){
            jQuery('#main').hide();
            jQuery('.tzwrap').css({
                top: '100%',
                opacity: 0
            });
            jQuery('.tzwrap-joomla').css({
                top: '-2000px',
                opacity: 0
            });
            jQuery('.tzwrap-html').animate({
                top: '-2000px',
                opacity: 0
            },600);

        },500);

        jQuery('#tziframe').removeClass('iframemove');
        jQuery('#tziframe').attr("src",$url);
        jQuery('.linkdetail').attr("href",$url);
        $wp = true;
        $joomla = true;
        $html = true;
        // method display buy now
        var $url_detail     = jQuery(this).attr('data-option-text');
        var template_name   = jQuery(this).attr('data-title');

        jQuery('.templazadetail').attr('href',$url_detail);
        jQuery('.templazadetail').css('display','block');
        jQuery('.logo_link').attr('href',$url_detail);
        jQuery('.sub_title span').html(template_name);
        jQuery('.sub_desc span').html(template_name);

        var guest_visited = readCookie('tz_visited');
        if(guest_visited !='visited'){
            setTimeout(function(){
                jQuery("#footer-sidebar").addClass("tz-display");
            }, 7000);
        }
    });

    jQuery('.tznav_left i').on('click', function(){
        jQuery(this).parent().toggleClass('menu_clicked');
    })
    var subscrible_height = jQuery('#footer-sidebar').height();
    jQuery('#footer-sidebar').css({
        'bottom':'-'+subscrible_height+'px'
    })
    jQuery('.tz-close').on('click',function(){
        var guest_visit     = 'visited';
        createCookie('tz_visited',guest_visit,1);
        jQuery('#footer-sidebar').removeClass('tz-display');
    })

});


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

