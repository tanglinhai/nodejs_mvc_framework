//jQuery(document).ready(function(){
//    var myVideo = jQuery('.videoID')[0];
//    jQuery('.tzautoplay').click(function(){
//        jQuery(this).hide();
//        jQuery('.tzpause').css('display','inline-block');
//        jQuery('.bg-video').hide();
//        jQuery('.video-logo').css({
//            opacity: 0
//        });
//        if (myVideo.paused)
//            myVideo.play();
//
//    }) ;
//    jQuery('.tzpause').click(function(){
//        jQuery(this).hide();
//        jQuery('.video-logo').css({
//            opacity: 1
//        });
//        jQuery('.bg-video').show();
//        jQuery('.tzautoplay').show();
//        if (myVideo.play)
//            myVideo.pause();
//
//    });
//});
function niory_video (m_id) {
    var myVideo = jQuery('.niory-video'+m_id+' .videoID')[0];
    jQuery('.niory-video'+m_id+' .tzautoplay').click(function(){
        jQuery(this).hide();
        jQuery('.niory-video'+m_id+' .tzpause').css('display','inline-block');
        jQuery('.niory-video'+m_id+' .bg-video').hide();
        jQuery('.video-logo').css({
            opacity: 0
        });
        if (myVideo.paused)
            myVideo.play();
    }) ;
    jQuery('.niory-video'+m_id+' .tzpause').click(function(){
        jQuery(this).hide();
        jQuery('.video-logo').css({
            opacity: 1
        });
        jQuery('.niory-video'+m_id+' .bg-video').show();
        jQuery('.niory-video'+m_id+' .tzautoplay').show();
        if (myVideo.play)
            myVideo.pause();
    });
}
