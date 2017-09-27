jQuery(window).load(function() {
	jQuery(document).find('body').addClass('loaded');
});
(function($) {
    "use strict"
// Head scroll
    $(window).load(function() {
        $("#intro").delay(500).fadeOut();
        $(".animationload").delay(800).fadeOut("slow");
    });
    if(jQuery('.head.fixed').length > 0) {
        jQuery(window).scroll(function(){
            var $_scrollTop  = '' ;
            $_scrollTop      = jQuery(this).scrollTop();
            if ( $_scrollTop >= 20 ) {
                jQuery('#tz-header-wrapper.fixed').addClass('tz-animation');
            }else{
                jQuery('#tz-header-wrapper.fixed').removeClass('tz-animation');
            }
        });
    }

// Search
    if($('.search-head').length > 0){
        var $icon = jQuery('.search-head').find('i.fa-search');
        jQuery('#tz-menu .plazart-megamenu').append(jQuery('.search-head').find('i.fa-search'));
        jQuery('#tz-menu .plazart-mainnav > .navbar-inner').append($icon);

        jQuery('#tz-menu-right').append($icon);
    }
    jQuery('.plazart-megamenu i.fa-search, #tz-menu .plazart-mainnav > .navbar-inner i.fa-search, #tz-menu-right > i.fa-search').click(function(){
        jQuery('.search-head').css('display','block');
        jQuery('.inputbox.search-query').focus();
    }) ;
    jQuery('.tz-form-close').click(function(){
        jQuery('.search-head').css('display','none');
    });
})(jQuery);
