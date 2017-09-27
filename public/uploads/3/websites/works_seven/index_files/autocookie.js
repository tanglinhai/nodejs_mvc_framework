
/*------------------ live demo*/
var $live_demo = true;

jQuery('.live_icon').click(function(){
    if ( $live_demo == true ){
        jQuery('.livedemo').addClass('liveeff');
        $live_demo = false;
    }else{
        jQuery('.livedemo').removeClass('liveeff');
        $live_demo = true;
    }
});

function change_color_example(data_color){
    jQuery('.addcss_example').remove();
    jQuery('head').append('' +
        '<style type="text/css" class="addcss_example">' +
        'a.tz_life_gate_red_more,'+'.tz-demo-copyright p a,'+
        '.tz-nav li a:hover, .tz_menu_top_header ul.tz-nav li a:hover,'+
        '.tweet-content a,'+'h1.title-404,'+'ul.tz_social_netwoks li a:hover'+'{color:'+ data_color +' !important;}'+
        '.mc4wp-form-fields p input[type="submit"],'+'#btn_top:hover,'+
        '.comment-respond p.form-submit input.submit,'+'.tzpagination2 a:hover, .tzpagination2 span.current,'+
        '#errorboxbody a'+'{background:'+ data_color +' !important;}'+
        '</style>' +
        '');
}
jQuery('.color').on('click',function(){
    jQuery(this).parent().find('.color').removeClass('active');
    jQuery(this).addClass('active');
    var data_color = jQuery(this).attr('data-color');
    createCookie('color_example',data_color);
    change_color_example(data_color);
});

jQuery('head').append('<style type="text/css" class="config_color"></style>');

if(readCookie('color_menu')){
    $parents_color = readCookie('color_menu');
    jQuery('.menu_color div').css('background-color','#'+$parents_color);

    jQuery('.config_color').append('' +
        '.tz-nav > li > a,' +
        '.tz_menu_top_header .tz_life_gate_nav_collapse ul.tz-nav li a'+
        '{color:#'+ $parents_color +' !important;}'+
        '')
}

if(readCookie('color_submenu')){
    $sub_color = readCookie('color_submenu');
    jQuery('.submenu_color div').css('background-color','#'+$sub_color);
    jQuery('.config_color').append('' +
        '.tz-header .tz_life_gate_nav_collapse ul li ul.sub-menu li a' +
        '{color:#'+ $sub_color +' !important;}'+
        '')
}

if(readCookie('border_submenu')){
    $border_color = readCookie('border_submenu');
    jQuery('.border_submenu div').css('background-color','#'+$border_color);

    jQuery('.config_color').append('' +
        '.tz-header .tz_life_gate_nav_collapse ul li ul.sub-menu' +
        '{background-color:#'+ $border_color +' !important;}'+
        '')
}

if(readCookie('menu_hover')){
    $hover_color = readCookie('menu_hover');
    jQuery('.menu_hover div').css('background-color','#'+$hover_color);
    jQuery('.config_color').append('' +
        '.tz_menu_top_header ul.tz-nav li a:hover,'+
        '.tz-nav li a:hover'+
        '{color:#'+ $hover_color +' !important;}'+
        '')
}

if(readCookie('submenu_hover')){
    $hoversub_color = readCookie('submenu_hover');
    jQuery('.submenu_hover div').css('background-color','#'+$hoversub_color);

    jQuery('.config_color').append('' +
        'body header nav ul.navbar-nav li ul li a:hover,'+
        '.mega-menu-horizontal li ul.mega-sub-menu li a:hover'+
        '{color:#'+ $hoversub_color +' !important;}'+
        '')
}

/* Home color */
if(readCookie('color_post_title')){
    $title_color_post = readCookie('color_post_title');
    jQuery('.color_title_post div').css('background-color','#'+$title_color_post);

    jQuery('.config_color').append('' +
        'h2.tz_life_gate_title_post a,'+
        'h1.tz_single_title_post' +
        '{color:#'+ $title_color_post +' !important;}'+
        '');
}

if(readCookie('color_content_post')){
    $content_color_post = readCookie('color_content_post');
    jQuery('.color_content_post div').css('background-color','#'+$content_color_post);

    jQuery('.config_color').append('' +
        '.tz-life-gate-blog-post-content-detail p,'+
        '.tz_single_content p' +
        '{color:#'+ $content_color_post +' !important;}'+
        '');
}
/* End Home color */

/* Social Color */
if(readCookie('color_social')){
    $social_color = readCookie('color_social');
    jQuery('.social_color div').css('background-color','#'+$social_color);

    jQuery('.config_color').append('' +
        'ul.tz_social_netwoks li a' +
        '{color:#'+ $social_color +' !important;}'+
        '')
}

if(readCookie('social_hover')){
    $social_hover_color = readCookie('social_hover');
    jQuery('.social_color_hover div').css('background-color','#'+$social_hover_color);

    jQuery('.config_color').append('' +
        'ul.tz_social_netwoks li a:hover'+
        '{color:#'+ $social_hover_color +' !important;}'+
        '');
}
/* End Social Color */

/* Sidebar Widgets Color */
if(readCookie('bk_title_color_widget')){
    $bk_title_color_widget = readCookie('bk_title_color_widget');
    jQuery('.sidebar_bk_title_widget_color div').css('background-color','#'+$bk_title_color_widget);

    jQuery('.config_color').append('' +
        'h3.module-title span'+
        '{background-color:#'+ $bk_title_color_widget +' !important;}'+
        '');
}

if(readCookie('title_color_widget')){
    $title_color_widget = readCookie('bk_title_color_widget');
    jQuery('.color_title_widget div').css('background-color','#'+$title_color_widget);

    jQuery('.config_color').append('' +
        'h3.module-title span'+
        '{color:#'+ $title_color_widget +' !important;}'+
        '');
}

if(readCookie('social_color_widget')){
    $social_color_widget = readCookie('social_color_widget');
    jQuery('.color_social_widget div').css('background-color','#'+$social_color_widget);

    jQuery('.config_color').append('' +
        '.social-widget a'+
        '{color:#'+ $social_color_widget +' !important;}'+
        '');
}
/* End Sidebar Widgets Color */

jQuery('a.reset').on('click',function(){
    eraseCookie('color_menu');
    eraseCookie('color_submenu');
    eraseCookie('border_submenu');
    eraseCookie('menu_hover');
    eraseCookie('submenu_hover');
    eraseCookie('color_social');
    eraseCookie('social_hover');
    eraseCookie('bk_title_color_widget');
    eraseCookie('title_color_widget');
    eraseCookie('social_color_widget');
    eraseCookie('color_post_title');
    eraseCookie('color_content_post');
    location.reload();
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