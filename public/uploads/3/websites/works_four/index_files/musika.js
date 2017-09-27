jQuery(document).ready(function(){
    "use strict";

    jQuery('.tz-icon-menu').on('click',function(){
        jQuery('.tz-header').addClass('tz-header-click-menu-effect');
    });
    jQuery('.tz-icon-close').on('click',function(){
        jQuery('.tz-header').removeClass('tz-header-click-menu-effect');
    });

    jQuery('.tz-icon-search').on('click',function(){
        jQuery('.tz-header').addClass('tz-header-click-search-effect');
    });
    jQuery('.tz-search-icon-close').on('click',function(){
        jQuery('.tz-header').removeClass('tz-header-click-search-effect');
    });

    jQuery('.tz-icon-search-3').on('click',function(){
        jQuery('.tz-header-search-form').addClass('tz-header-search-form-show');
        jQuery('.tz-icon-search-3').css('display','none');
        jQuery('.tz-search-icon-close-3').css('display','inline-block');
    });
    jQuery('.tz-search-icon-close-3').on('click',function(){
        jQuery('.tz-header-search-form').removeClass('tz-header-search-form-show');
        jQuery('.tz-icon-search-3').css('display','inline-block');
        jQuery('.tz-search-icon-close-3').css('display','none');
    });
}) ;

/**
 * method for menu
 */
jQuery(window).scroll(function(){
    "use strict";

    var $_scrollTop = jQuery(window).scrollTop();

    if ($_scrollTop > 0) {
        jQuery('.tz-header-menu-type-3').addClass('tz-homeEff');
    } else {
        jQuery('.tz-header-menu-type-3').removeClass('tz-homeEff');
    }
});
