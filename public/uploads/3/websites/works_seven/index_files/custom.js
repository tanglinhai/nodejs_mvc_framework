/*
 * Method reize image
 * @variables class
 */
function tz_lifegate_ResizeImage(obj){
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

        widthImage = image.naturalWidth;
        heightImage = image.naturalHeight;

        var tzimg	=	new resizeImage(widthImage, heightImage, widthStage, heightStage);
        jQuery(this).find('img').css ({ top: tzimg.top, left: tzimg.left, width: tzimg.width, height: tzimg.height });


    });

}

jQuery(document).ready(function() {
    "use strict";

    /* Start back to top */
    jQuery('#btn_top').click(function(){
        jQuery('html, body').animate({
            scrollTop: 0
        },1500);
    });
    /* End back to top */


    /* Method for video */
    jQuery('.tz_play_btn').click(function(){

        var $_this = jQuery(this);
        var myVideo = $_this.parents('.tz-life-gate-blog-post-video').find('.videoID')[0];
        jQuery(this).hide();
        $_this.parents('.tz-life-gate-blog-post-video').find('.tz_play_pause_button').css('opacity',0);
        $_this.parents('.tz-life-gate-blog-post-video').find('.tz_pause_btn').show();
        $_this.parents('.tz-life-gate-blog-detail').addClass('tz-blog-detail-play');
        $_this.parents('.tz_post_inc_blog').addClass('tz_post_inc_blog_play');
        if (myVideo.paused)
            myVideo.play();

    }) ;

    jQuery('.tz_pause_btn').click(function(){

        jQuery(this).hide();
        var $_this = jQuery(this);
        var myVideo = $_this.parents('.tz-life-gate-blog-post-video').find('.videoID')[0];
        $_this.parents('.tz-life-gate-blog-post-video').find('.tz_play_pause_button').css('opacity',1);
        $_this.parents('.tz-life-gate-blog-post-video').find('.tz_play_btn').show();
        $_this.parents('.tz-life-gate-blog-detail').removeClass('tz-blog-detail-play');
        $_this.parents('.tz_post_inc_blog').removeClass('tz_post_inc_blog_play');
        if (myVideo.play)
            myVideo.pause();

    });

    /* ResizeImage blog list */
    tz_lifegate_ResizeImage( jQuery('.tz-life-gate-blog-detail-list .tz-life-gate-blog-post-image') );

    /* ResizeImage author post */
    var $tz_img_post_author = jQuery('.tz_img_post_author');
    $tz_img_post_author.each(function(){
        tz_lifegate_ResizeImage( jQuery(this) );
    });
    /* End ResizeImage author post */

    /* ResizeImage cat portfolio */
    tz_lifegate_ResizeImage( jQuery('.tz_portfolio_item .item-img') );

    /* And class row */
    var $tz_class_row = jQuery( '.tz_row_sticky_sidebar' );

    if ( $tz_class_row.length ) {

        $tz_class_row.each(function() {
            jQuery(this).find('.vc_column_container').addClass('tz_theia_sticky');
        })

    }

    /* Start theia-sticky-sidebar */

    jQuery('.tz_theia_sticky').theiaStickySidebar();

    /* End theia-sticky-sidebar */

    /* prettyPhoto for image gallery modal popup portfolio */
    var $portfolio_prettyPhoto = jQuery("a[data-rel^='portfolio_prettyPhoto']");
    if( $portfolio_prettyPhoto.length ){
        $portfolio_prettyPhoto.prettyPhoto({
            social_tools: false,
            hook: 'data-rel'
        });
    }
    /* End prettyPhoto for image gallery modal popup portfolio */

    /* Start Method for Slider Post */
    var $tz_life_gate_blog_post_slider   = jQuery( '.tz-life-gate-blog-post-slider' );

    if ( $tz_life_gate_blog_post_slider.length ) {

        $tz_life_gate_blog_post_slider.each(function() {

            jQuery(this).owlCarousel({
                items : 1,
                slideSpeed:800,
                paginationSpeed:800,
                smartSpeed: 700,
                dots:false,
                autoplay: false,
                autoplayTimeout: 5000,
                loop: true,
                autoHeight:true
            });

            jQuery('.tz_slider_left_arrow_click').click(function(){
                jQuery(this).parents('.tz-life-gate-blog-post-type-slider').find('.tz-life-gate-blog-post-slider').trigger('prev.owl.carousel');
            });
            jQuery('.tz_slider_right_arrow_click').click(function(){
                jQuery(this).parents('.tz-life-gate-blog-post-type-slider').find('.tz-life-gate-blog-post-slider').trigger('next.owl.carousel');
            });

        })

    }
    /* End Method for Slider Post */

});


jQuery(window).on('load',function(){

    "use strict";
    jQuery('#tzloadding').remove();

    /* Start Mobile Menu Left Right */

    var $tz_mobile_left_right       =   jQuery( '.tz_mobile_menu_left_right' ),
        $tz_menu_left               =   jQuery( '.tz_life_gate_nav_collapse_left ul.tz-nav' ),
        $tz_menu_right              =   jQuery( '.tz_life_gate_nav_collapse_right ul.tz-nav' ),
        $tz_max_menu_left           =   jQuery( '.tz_life_gate_nav_collapse_left .mega-menu' ),
        $tz_max_menu_right          =   jQuery( '.tz_life_gate_nav_collapse_right .mega-menu' ),
        $tz_mobile_menu_left_right  =   jQuery( '.tz_mobile_menu_left_right .collapse ul.nav'),
        $tz_mobile_full             =   jQuery( '.tz_mobile_menu_full'),
        $tz_mobile_menu_full        =   jQuery( '.tz_mobile_menu_full .collapse ul.nav'),
        $tz_menu_full               =   jQuery( '.tz_life_gate_nav_collapse_full ul.tz-nav' );

    if ( $tz_max_menu_left.length || $tz_max_menu_right.length ) {

        var $tz_get_max_menu_left   =  $tz_max_menu_left.html(),
            $tz_get_max_menu_right  =  $tz_max_menu_right.html();

        $tz_mobile_menu_left_right.append( $tz_get_max_menu_left + $tz_get_max_menu_right );

    }

    if ( $tz_mobile_left_right.length ) {
        var $tz_get_menu_left   =  $tz_menu_left.html(),
            $tz_get_menu_right  =  $tz_menu_right.html();

        $tz_mobile_menu_left_right.append( $tz_get_menu_left + $tz_get_menu_right );

    }

    if ( $tz_mobile_full.length ) {
        var $tz_get_menu_full   =  $tz_menu_full.html();

        $tz_mobile_menu_full.append( $tz_get_menu_full );
    }

    if ( $tz_mobile_left_right.length || $tz_mobile_full.length ) {

        var $tz_click_sub_menu_fist =   jQuery('.tz_mobile_menu_config .tz-nav > li.menu-item-has-children > a'),
            $tz_click_sub_menu_sub  =   jQuery('.tz_mobile_menu_config .tz-nav .sub-menu li.menu-item-has-children > a');

        $tz_click_sub_menu_fist.each(function() {
            var $tz_count_click        =   0;
            jQuery(this).on('click',function(e){

                $tz_count_click ++;

                if($tz_count_click < 2 ) {
                    e.preventDefault();
                    jQuery(this).parents('.menu-item').first().find('.sub-menu').first().css('display','block');
                }
            });

        });

        $tz_click_sub_menu_sub.each(function() {
            var $tz_count_click        =   0;
            jQuery(this).on('click',function(e){

                $tz_count_click ++;

                if( $tz_count_click < 2 ) {
                    e.preventDefault();
                    jQuery(this).parents('.menu-item').first().find('.sub-menu').first().css('display','block');
                    jQuery(this).parents('.menu-item').first().addClass('mobile-submenu-opened');
                }
            });

        });

    }
    /* End Mobile Menu Left Right */

    /* Start Element blog slider */
    var $tz_life_gate_slider_blog   = jQuery( '.tz_life_gate_slider_blog' );

    if ( $tz_life_gate_slider_blog.length ) {

        $tz_life_gate_slider_blog.each(function() {

            var $tz_auto_slider_blog        =   '',
                $tz_loop_slider_blog        =   '',
                $tz_rtl_slider_blog         =   '',
                $tz_navigation_slider_blog  =   '',
                $tz_type_slider_post        =   jQuery(this).attr('data-type-slider'),
                $auto_slider_blog           =   jQuery(this).attr('data-auto'),
                $loop_slider_blog           =   jQuery(this).attr('data-loop'),
                $rtl_slider_blog            =   jQuery(this).attr('data-rtl'),
                $navigation_slider_blog     =   jQuery(this).attr('data-navigation'),
                $tz_life_gate_data_item_dk  =   jQuery(this).attr('data-item-dk');

            if ( $auto_slider_blog == 0 ) {
                $tz_auto_slider_blog = false;
            }else if ( $auto_slider_blog == 1 ) {
                $tz_auto_slider_blog = true;
            }

            if ( $loop_slider_blog == 0 ) {
                $tz_loop_slider_blog = false;
            }else if ( $loop_slider_blog == 1 ) {
                $tz_loop_slider_blog = true;
            }

            if ( $rtl_slider_blog == 0 ) {
                $tz_rtl_slider_blog = false;
            }else if ( $rtl_slider_blog == 1 ) {
                $tz_rtl_slider_blog = true;
            }

            if ( $navigation_slider_blog == 1 ) {
                $tz_navigation_slider_blog = true;
            }else if ( $navigation_slider_blog == 0 )  {
                $tz_navigation_slider_blog = false;
            }

            if ( $tz_type_slider_post == 1 ) {

                jQuery(this).owlCarousel({
                    items : 1,
                    rtl:$tz_rtl_slider_blog,
                    slideSpeed:800,
                    paginationSpeed:800,
                    smartSpeed: 700,
                    dots:$tz_navigation_slider_blog,
                    autoplay: $tz_auto_slider_blog,
                    autoplayTimeout: 5000,
                    loop: $tz_loop_slider_blog,
                    autoHeight:true
                })

            }else if ( $tz_type_slider_post == 2 ) {

                jQuery(this).owlCarousel({
                    responsive : {
                        0 : {
                            items : 1
                        },
                        600: {
                            items : 2
                        },
                        991: {
                            items : 3
                        },
                        1200: {
                            items : $tz_life_gate_data_item_dk
                        }
                    },
                    rtl:$tz_rtl_slider_blog,
                    slideSpeed:1000,
                    paginationSpeed:1000,
                    smartSpeed: 1000,
                    dots:$tz_navigation_slider_blog,
                    autoplay: $tz_auto_slider_blog,
                    autoplayTimeout: 5000,
                    loop: $tz_loop_slider_blog,
                    autoHeight:true
                })

            }else if ( $tz_type_slider_post == 3 ) {

                var $tz_data_margin = parseInt( jQuery(this).attr('data-margin') );

                jQuery(this).owlCarousel({
                    responsive : {
                        0 : {
                            items : 1
                        },
                        600: {
                            items : 2
                        },
                        991: {
                            items : 3
                        },
                        1200: {
                            items : $tz_life_gate_data_item_dk
                        }
                    },
                    rtl:$tz_rtl_slider_blog,
                    slideSpeed:1000,
                    paginationSpeed:1000,
                    smartSpeed: 1000,
                    margin:$tz_data_margin,
                    dots:$tz_navigation_slider_blog,
                    autoplay: $tz_auto_slider_blog,
                    autoplayTimeout: 5000,
                    loop: $tz_loop_slider_blog,
                    autoHeight:true
                })

            }

            jQuery('.tz_left_arrow_click').click(function(){
                jQuery(this).parents('.tz_recent_post_blog').find('.tz_life_gate_slider_blog').trigger('prev.owl.carousel');
            });
            jQuery('.tz_right_arrow_click').click(function(){
                jQuery(this).parents('.tz_recent_post_blog').find('.tz_life_gate_slider_blog').trigger('next.owl.carousel');
            });

        })

    }
    /* End Element blog slider */

    /* Start Recent Post Element Menu */
    var $tz_life_gate_post_menu   = jQuery( '.tz_post_menu' );

    if ( $tz_life_gate_post_menu.length ) {

        $tz_life_gate_post_menu.each(function(){

            var $tz_auto_slider_menu            =   '',
                $tz_loop_slider_menu            =   '',
                $tz_post_menu_rtl               =   '',
                $auto_slider_menu               =   jQuery(this).attr('data-auto'),
                $loop_slider_menu               =   jQuery(this).attr('data-loop'),
                $post_menu_rtl                  =   jQuery(this).attr('data-rtl'),
                $tz_life_gate_item_menu_post    =   jQuery(this).attr('data-item-dk');

            if ( $auto_slider_menu == 0 ) {
                $tz_auto_slider_menu = false;
            }else if ( $auto_slider_menu == 1 )  {
                $tz_auto_slider_menu = true;
            }

            if ( $loop_slider_menu == 0 ) {
                $tz_loop_slider_menu = false;
            }else if ( $loop_slider_menu == 1 )  {
                $tz_loop_slider_menu = true;
            }

            if ( $post_menu_rtl == 0 ) {
                $tz_post_menu_rtl = false;
            }else if ( $post_menu_rtl == 1 )  {
                $tz_post_menu_rtl = true;
            }

            jQuery(this).owlCarousel({
                responsive : {
                    0 : {
                        items : 1
                    },
                    600: {
                        items : 2
                    },
                    991: {
                        items : 3
                    },
                    1200: {
                        items : $tz_life_gate_item_menu_post
                    }
                },
                rtl:$tz_post_menu_rtl,
                slideSpeed:1000,
                margin:25,
                paginationSpeed:1000,
                smartSpeed: 1000,
                dots:false,
                autoplay: $tz_auto_slider_menu,
                autoplayTimeout: 5000,
                loop: $tz_loop_slider_menu,
                autoHeight:true
            })

        })

    }
    /* End Recent Post Element Menu */

});

var tz_timer;

jQuery(window).on("load resize",function(e){

    "use strict";

    var $tz_life_gate_width_window  =   jQuery( window ).width();

    /* ResizeImage cat portfolio */
    tz_lifegate_ResizeImage( jQuery('.tz_portfolio_item .item-img') );

    /* ResizeImage blog list */
    tz_lifegate_ResizeImage( jQuery('.tz-life-gate-blog-detail-list .tz-life-gate-blog-post-image') );

    /* height for event grid */
    var $opject_event   = jQuery('.tz-life-gate-blog-grid');
    var $array_li_event = [];
    jQuery($opject_event).each(function(){
        $array_li_event.push(jQuery(this).innerHeight());
    });
    var $max_height_event = Math.max.apply( Math, $array_li_event );
    $opject_event.css('height',$max_height_event+'px');
    /* End height for event grid */

});

jQuery(window).scroll(function(){

    if ( tz_timer ) clearTimeout(tz_timer);

    tz_timer = setTimeout(function(){

        var $tz_btn_top     =   jQuery( '#btn_top'),
            $win_scroll_top =   jQuery(window).scrollTop();

        if ( $tz_btn_top.length ) {

            if ( $win_scroll_top > 100 ) {
                $tz_btn_top.css('visibility','visible');
            }else {
                $tz_btn_top.css('visibility','hidden');
            }

        }

    }, 100);

});
