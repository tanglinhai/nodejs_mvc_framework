"use strict";

jQuery(window).ready(function(){
    jQuery('.tz-button-toggle').live("click",function(){
        jQuery(".tz-menu").toggleClass("tz-show");
    });

    var submenu     =   jQuery(".tz-header .navbar-nav > li > .sub-menu li .sub-menu");

    submenu.each(function(){
        var w_win       =   jQuery(window).width();
        var w_submenu   =   submenu.width();
        var l_submenu   =   submenu.offset().left;
        if( w_win < (w_submenu + l_submenu) ){
            submenu.addClass("tz-right");
        }else {
            submenu.remove("tz-right");
        }
    });
});

/*  calling jPreLoader - Loading    */
jQuery(window).load( function() {
    if( jQuery('#tzloadding').length > 0 ){
        jQuery('body').jpreLoader({
            splashID: "#tzloadding",
            loaderVPos: '70%',
            jprePercentage: true,
            autoClose: true,
            splashFunction: function() {
            }
        }, function() {	/* callback function */
        });
    }
});


/**
 * method for menu
 */
jQuery(window).scroll(function(){
    var $_scrollTop = jQuery(window).scrollTop();
    var h_win       = jQuery(window).height();
    if ( $_scrollTop > (h_win-80) ) {
        jQuery('.tz-header').addClass('tz-header-eff');
    }else{
        jQuery('.tz-header').removeClass('tz-header-eff');
    }
});

