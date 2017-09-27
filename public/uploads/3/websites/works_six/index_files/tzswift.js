jQuery(document).ready(function(){
    "use strict";
    // loading
    jQuery('body').jpreLoader({
        splashID: "#jSplash",
        loaderVPos: '0',
        autoClose: true,
        closeBtnText: "",
        showPercentage:false,
        showSplash: false
    });

    jQuery('.tz_icon_search').on('click',function(){
        jQuery('.tz-header-search-form').addClass('tz-header-search-form-show');
        jQuery('.tz_icon_search').css('display','none');
        jQuery('.tz_icon_close').css('display','block');
    });
    jQuery('.icon_close').on('click',function(){
        jQuery('.tz-header-search-form').removeClass('tz-header-search-form-show');
        jQuery('.tz_icon_search').css('display','block');
        jQuery('.tz_icon_close').css('display','none');
    });

}) ;