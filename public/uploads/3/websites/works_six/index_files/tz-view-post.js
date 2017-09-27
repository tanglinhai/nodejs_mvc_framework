resizeTimer         = null;
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
 * @variables Desktop
 * @variables tabletportrait
 * @variables mobilelandscape
 * @variables mobileportrait
 */
if ( typeof  Desktop == 'undefined') {
    var Desktop = 4
}
if ( typeof  tabletportrait == 'undefined') {
    var tabletportrait = 3
}
if ( typeof  mobilelandscape == 'undefined') {
    var mobilelandscape = 2
}
if ( typeof  mobileportrait == 'undefined') {
    var mobileportrait = 1
}

function tz_init(Desktop , tabletportrait, mobilelandscape, mobileportrait){

    var contentWidth    = jQuery('.tzViewPost_Grid').width();
    var numberItem      = 2;
    var newColWidth     = 0;
    var featureColWidth = 0;
    var widthWindwow = jQuery(window).width();
    if (widthWindwow >= 992) {
        numberItem = Desktop;
    } else if (  widthWindwow >= 768) {
        numberItem = tabletportrait ;
    } else if (  widthWindwow >= 480) {
        numberItem = mobilelandscape ;
    } else if (widthWindwow < 480) {
        numberItem = mobileportrait ;
    }
    newColWidth = Math.floor(contentWidth / numberItem);
//    alert(newColWidth);
    featureColWidth = newColWidth * 2;
    jQuery('.element').width(newColWidth);
    jQuery('.tz_feature_item').width(featureColWidth);
    var $container  = jQuery('.tzViewPost_Grid') ;
    $container.imagesLoaded(function(){
        $container.isotope({
            masonry:{
                columnWidth: newColWidth
            }
        });
    });
    TzTemplateResizeImage(jQuery('.tzPostImage_fixHeight'));
}

/*
 * Method reize
 */

jQuery(window).bind('load resize', function() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout("tz_init(Desktop, tabletportrait, mobilelandscape, mobileportrait)", 100);
});

jQuery(document).ready(function() {

}) ;