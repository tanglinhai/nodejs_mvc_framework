jQuery(document).ready(function() {
    "use strict";

    jQuery(".tzOurteam_Social").each(function() {
        var count = jQuery(this).find('.tzSocial_Item').length;
        jQuery(this).addClass('tzSocial-' + count +'-item');

        var i = 1;
        jQuery(this).find('.tzSocial_Item').each(function(){
            jQuery(this).addClass('item-'+ i);
            i++;
        });
    });

});