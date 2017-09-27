var $container          =   jQuery('.tzPortfolioGrid_Content'),
    tzpg_resizeTimer    = null;
/*
 * Method resize image
 */
function TzTemplateResizeImage(obj){

    var widthStage;
    var heightStage ;
    var widthImage;
    var heightImage;
    obj.each(function (i,el){
        heightStage = jQuery(this).height();
        widthStage = jQuery (this).width();
        var img_url = jQuery(this).find('img').attr('src');
        var image = new Image();
        image.src = img_url;
        image.onload = function() {
        }
        widthImage = image.naturalWidth;
        heightImage = image.naturalHeight;
        var tzimg	=	new resizeImage(widthImage, heightImage, widthStage, heightStage);
        jQuery(this).find('img').css ({ top: tzimg.top, left: tzimg.left, width: tzimg.width, height: tzimg.height });
    });
}

/*
 * Method portfolio column
 * @variables tzDesktop
 * @variables tztabletportrait
 * @variables tzmobilelandscape
 * @variables tzmobileportrait
 */
if ( typeof  tzDesktop == 'undefined') {
    var tzDesktop = 4
}
if ( typeof  tztabletportrait == 'undefined') {
    var tztabletportrait = 3
}
if ( typeof  tzmobilelandscape == 'undefined') {
    var tzmobilelandscape = 2
}
if ( typeof  tzmobileportrait == 'undefined') {
    var tzmobileportrait = 1
}
if ( typeof  tzheight_item == 'undefined') {
    var tzheight_item = 300
}

/*
 * Method create tags
 * @variables $filter_status
 */
function tzpg_create_tags() {
        var cat_status = []; //var cat_status = [];
        jQuery('.tzPortfolioGrid_Content .tzPortfolioGrid-item').each(function(){
            var item_class = jQuery(this).attr('class');

            item_class = item_class.split(' ');
            for(var i = 0; i < item_class.length; i++){

                if(parseInt(item_class[i].indexOf('swifts'), 10) === 0) {
                    if(jQuery.inArray(item_class[i], cat_status)){
                        cat_status.push(item_class[i]);
                    }
                }
            }
        });
        for(var index=0; index < cat_status.length; index++){
            jQuery('.tzfilter a#' + cat_status[index]).removeClass('TZHide');
        }
}
function tzpg_init(tzDesktop , tztabletportrait, tzmobilelandscape, tzmobileportrait){

    var contentWidth    = jQuery('.tzPortfolioGrid_Content').width();
    var numberItem      = 2;
    var newColWidth     = 0;
    var featureColWidth = 0;
    var widthWindwow = jQuery(window).width();
    if (widthWindwow >= 992) {
        numberItem = tzDesktop;
    } else if (  widthWindwow >= 768) {
        numberItem = tztabletportrait ;
    } else if (  widthWindwow >= 480) {
        numberItem = tzmobilelandscape ;
    } else if (widthWindwow < 480) {
        numberItem = tzmobileportrait ;
    }
    newColWidth = Math.floor(contentWidth / numberItem);
//    alert(newColWidth);
    featureColWidth = newColWidth * 2;
    jQuery('.tzPortfolioGrid-item').width(newColWidth);
    jQuery('.tz_image_horizontal').width(featureColWidth);

    jQuery('.tzPortfolioGrid-item .tz-inner .item-img').css('height',tzheight_item+'px');
    jQuery('.tz_image_vertical .tz-inner .item-img').css('height',(tzheight_item*2)+'px');

    var $container  = jQuery('.tzPortfolioGrid_Content') ;
    $container.imagesLoaded(function(){
        $container.isotope({
            masonry:{
                columnWidth: newColWidth
            }
        });

    });
    TzTemplateResizeImage(jQuery('.tzPortfolioGrid-item .tz-inner .item-img'));
}

/*
 * Method reize
 */

jQuery(window).bind('load resize', function() {
    if (tzpg_resizeTimer) clearTimeout(tzpg_resizeTimer);
    tzpg_resizeTimer = setTimeout("tzpg_init(tzDesktop, tztabletportrait, tzmobilelandscape, tzmobileportrait)", 100);
});

/*
 * Method Filter
 */
function tzpg_loadPortfolio(){

        var $container = jQuery('.tzPortfolioGrid_Content');
        var $optionSets = jQuery('.tzfilter'),
            $optionLinks = $optionSets.find('a');
        $optionLinks.on('click',function(event){
            event.preventDefault();
            var $this = jQuery(this);
            // don't proceed if already selected
            if ( $this.hasClass('selected') ) {
                return false;
            }
            var $optionSet = $this.parents('.tzfilter');
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');

            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[ key ] = value;

            if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
                // changes in layout modes need extra logic
                changeLayoutMode( $this, options );
            } else {
                // otherwise, apply new options
                $container.isotope( options );
            }
            return false;
        });

}
jQuery(document).ready(function() {
    // prettyPhoto for image gallery modal popup
    jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
        social_tools: false,
        hook: 'data-rel'
    });

    $container.imagesLoaded( function(){
        tzpg_init(tzDesktop, tztabletportrait, tzmobilelandscape, tzmobileportrait);
    });

    tzpg_create_tags();
    tzpg_loadPortfolio();
}) ;

jQuery(function(){
    $container.infinitescroll({
            navSelector  : '#loadajax a',    // selector for the paged navigation
            nextSelector : '#loadajax a:first',  // selector for the NEXT link (to page 2)
            itemSelector : '.tzPortfolioGrid-item',     // selector for all items you'll retrieve
            errorCallback: function(){
                jQuery('#tz_append a').addClass('tzNomore');

            },
            loading: {
                msgText:'',
                finishedMsg: '',
                img:'',
                selector: '#tz_append'
            }
        },
        // call Isotope as a callback
        function( newElements ) {
            var $newElems =   jQuery( newElements ).css({ opacity: 0 });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({ opacity: 1 });
                // trigger scroll again
                $container.isotope( 'appended', $newElems);
                if (String(jQuery.browser.safari) && String(document.readyState) !== "complete") {
                    tzpg_init(tzDesktop, tztabletportrait, tzmobilelandscape, tzmobileportrait);
                } else {
                    tzpg_init(tzDesktop, tztabletportrait, tzmobilelandscape, tzmobileportrait);
                }
                //if there still more item
                if($newElems.length){
                    //move item-more to the end
                    jQuery('div#tz_append').find('a:first').show();
                }
            });

            tzpg_create_tags();
        }
    );


    jQuery(window).unbind('.infscr');

    jQuery('div#tz_append a').on('click',function(){

        jQuery('div#tz_append').find('a:first').hide();
        $container.infinitescroll('retrieve');
    });

});