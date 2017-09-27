jQuery(document).ready(function () {
    jQuery('body').append('<div id="quick_view_overlay" style="display:none"></div><div class="tz_load" style="display:none"></div><div id="quick_view_popup"></div>');
    jQuery(".browse-view .product .spacer .vm-product-media-container").each(function(indx, element){
        var my_product_id = jQuery(this).find(".quick_ids").val();
        if(my_product_id){
            jQuery(this).append("<div class=\'quick_btn\' onClick =\'quick_btn("+my_product_id+")\'>Quick View</div>");
        }
        jQuery(this).find(".quick_id").remove();
    });
});
function quick_btn(product_id) {
    jQuery('#quick_view_overlay').show();
    jQuery('.tz_load').show();
    jQuery.ajax({
        url: 'index.php?action=tz_vm_ajax',
        type: 'get',
        data: 'product_id=' + product_id,
        success: function (data) {
            jQuery('#quick_view_popup').html(data);
            jQuery('.tz_load').hide();
            jQuery('#tz-view').show(300);
            jQuery('#quick_view_overlay, #quick_view_close').click(function () {
                jQuery('#tz-view').remove();
                jQuery('#quick_view_overlay').hide();
            });
            return false;
        }
    });
}