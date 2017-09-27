// union.modulePrototype = (function(){
//     return {
//         init: function() {

//         }
//     };
// })();

/* TOC

 @MAIN
 @MASTHEAD
 @TIMER
 @FEATURE (HOME)
 @CAROUSEL
 @TEAM MEMBERS LIST
 @AMAZING MAGICALLY MUTATING TABS
 @PILL TABS
 @VERTICAL TABS
 @TELEPORT
 @INLINESVG
 @VERTICAL CENTERING
 @AJAX REPLACE

 TOC */

/*-----------------------*/


function ucwords(str) {
	return (str + '')
		.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
			return $1.toUpperCase();
		});
}

var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
$.event.special.swipeupdown = {
    setup: function() {
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function(event) {
            var data = event.originalEvent.touches ?
                    event.originalEvent.touches[ 0 ] :
                    event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

            function moveHandler(event) {
                if (!start) {
                    return;
                }
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [ data.pageX, data.pageY ]
                };

                // prevent scrolling
                if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                    event.preventDefault();
                }
            }
            $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function(event) {
                $this.unbind(touchMoveEvent, moveHandler);
                if (start && stop) {
                    if (stop.time - start.time < 1000 &&
                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                            Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                        start.origin
                                .trigger("swipeupdown")
                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                    }
                }
                start = stop = undefined;
            });
        });
    }
};
$.each({
    swipedown: "swipeupdown",
    swipeup: "swipeupdown"
}, function(event, sourceEvent){
    $.event.special[event] = {
        setup: function(){
            $(this).bind(sourceEvent, $.noop);
        }
    };
});

if (typeof union == 'undefined') {
	var union = {};
}

$(window).resize(function() {
	if (this.resizeTO) {
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 500);
});

var scrollTripped = 0;
var $slider;
var $trackTop;

/*-----------------------
 @MAIN
 ------------------------*/
union.main = (function() {

	return {
		isMobile: false,
		init: function() {

			$.Android = (navigator.userAgent.match(/Android/i));
			$.iPhone = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));
			$.iPad = ((navigator.userAgent.match(/iPad/i)));
			$.iOs4 = (/OS [1-4]_[0-9_]+ like Mac OS X/i.test(navigator.userAgent));

			if ($.iPhone || $.iPad || $.Android) {
				this.isMobile = true;
			}
			this.registerEvents();
		},
		registerEvents: function() {
			union.masthead.init();
			union.navbar.init();

			if($('.page-home').length == 0) {
         		union.parallax.init();
      		}
      		if ($("body.page-home").length) {
				union.feature.init();
				union.hpvideo.init();
			}
			// if ($("body.page-services-index").length) {
			// 	union.serviceTabsHover.init();
			// }
			if ($(".m_tabs").length) {
				union.tabs.init();
			}
			if ($(".m_pill-tabs").length) {
				union.pillTabs.init();
			}
			if ($(".m_tabs-vertical").length || $(".m_tabs-horizontal").length) {
				union.basicTabs.init();
			}
			if ($(".m_teleport").length) {
				union.teleport.init();
			}
			if ($(".m_modal").length) {
				union.modal.init();
			}
			if ($("[data-ajax-append]").length) {
				union.loadMore.init();
			}
			if ($(".homeSlides").length) {
				union.home.init();
			}
			if($('.page-case-study').length || $('.page-services').length || $('.page-about').length || $('.page-about-culture').length) {
				union.video.init();
			}
			if($('.alert-bar').length) {
				union.alert.init();
			}
			$(".fitvids").fitVids();

			union.loading.init($('.page-case-study').length);

			$(window).load(function() {
				if ($("[data-inlinesvg]").length) {
					union.inlinesvg.init();
				}
				if ($(".m_carousel").length) {
					union.carousel.prep();
				}
				if ($(".page-case-study").length) {
					union.casestudy.init();
				}
				if ($("#typed").length) {
					union.typed.init();
				}
				// if ($('.video-holder iframe').length) {
				// 	union.wistia.init();
				// }
			});
		},
		windowWide: function() {
			return $(window).width() > 767 ? true : false;
		},
		isTouchDevice: function() {
			var is_touch_device = 'ontouchstart' in document.documentElement;
			return is_touch_device;
		},
		rgbToHex: function(rgb) {
		    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		},
		setLogoColors: function(bolt, letters)
		{
			var boltColor = bolt ? bolt : $('.brand .bolt').attr('data-original-fill');
			var letterColor = letters ? letters : $('.brand .letter').attr('data-original-fill');

			$("body .brand .bolt").animate({
				fill: boltColor
			}, 200);
			$("body .brand .letter").animate({
				fill: letterColor
			}, 200);
		},
		scrollBindings: function() {
            if($('.page-home').length == 0) {

            }
			if($('.page-case-study').length) {
				if(!union.main.isMobile && $(window).width() >= 1200) {
					union.casestudy.playOrPauseHero();
					union.casestudy.fadeInObjects();
				}
			}
		}
	};
})();

/*
 * LOAD!
 */
jQuery(function() {
	union.main.init();
  FrameEvents.on(window, "scroll", union.main.scrollBindings);

});

/*-----------------------
 @AJAX REPLACE

 Replace append content from ajax response
 ------------------------*/
union.loadMore = (function() {

    appendContent = function($clicked) {
        var ajaxUrl = $clicked.attr('href');
        var resultContainerSelector = $clicked.attr('data-ajax-append');
        var $resultContainer = $(resultContainerSelector);

        // get the old offset
        var offset = ajaxUrl.match(/offset=(.*)/)[1];

        // add 10 to the old offset
        var newOffset = parseInt(offset) + 10;

        var contents = $.get(ajaxUrl, function(data) {
            if (data) {
                // update the ajax url with the new offset
                $clicked.attr('href', ajaxUrl.replace('offset=' + offset, 'offset=' + newOffset));

                // add the content
                $resultContainer.append(data);

                $flag = $resultContainer.find('[data-no-more-posts]');
                if($flag.length > 0) {
                    $clicked.hide();
                }

            } else {
                $clicked.text('Sorry, No More Posts');
            }
        });
    }

    return {
        init: function() {
            $('body').on('click', '[data-ajax-append]', function(e) {
                e.preventDefault();
                appendContent($(this));
            });
        }
    };
})();
/*-----------------------
 @MASTHEAD

 Adding a background and adjusting padding when scroll position is greater than .m_jumbotron height.
 ------------------------*/
union.masthead = (function() {
    var settings = {
        $scroller: $(window),
        $masthead: $(".masthead"),
        $jumboHeight: $(".m_jumbotron").outerHeight() / 2,
        $mHeightFixed: $(".masthead").outerHeight(),
    }
    return {
        init: function() {
            if ($("body.page-blog").length || $("div.no-header-image").length) {
                // blog listing page uses fixed by default
                settings.$masthead.addClass("is-fixed");
            } else {
                settings.$masthead.addClass("ready-to-fix");
                this.doFixed();
            }
        },
        doFixed: function() {
            settings.$scroller.scroll(function() {
                union.masthead.isItFixed();
            });
            union.masthead.isItFixed();
        },
        isItFixed: function() {
            if (settings.$scroller.scrollTop() > settings.$jumboHeight - settings.$mHeightFixed && $('.page-home').length == 0) {
                settings.$masthead.addClass("is-fixed");
                if ($('.page-links').length) {
                    $('.page-links').addClass("pl-is-fixed");
                }
            } else {
                if($('.page-home').length == 0) {
                    settings.$masthead.removeClass("is-fixed");
                    if ($('.page-links').length) {
                        $('.page-links').removeClass("pl-is-fixed");
                    }
                }
            }
        }
    };
})();
/*-----------------------
 @NAVBAR
 ------------------------*/
union.navbar = (function() {
    var htmlHeight = 0,
        scrollPos = 0,
        currentTopMargin,
        currentTopOffset,
        wasNavFixed = false;

    return {
        init: function() {

            $(".menu-trigger").on("click", function(e) {
                e.preventDefault();
                if ($("#st-container").hasClass("menu-open")) {
                    setTimeout(function() {
                        $(".st-content").prependTo("body");
                        $(".masthead").prependTo("body");

                        if($('body').hasClass('page-home')) {
                            union.feature.rebindScroll();
                        }
                        union.video.play();

                        if($('body').hasClass('page-services-detail')) {
                            $('.page-services-detail .m_jumbotron video').get(0).play();
                        }
                        $('html,.st-container').height(htmlHeight + "px");
                        $('.st-container').height('0');
                        $(window).scrollTop(scrollPos);
                        $(window).trigger('scroll');
                    }, 500);
                } else {
                    htmlHeight = $("html").height();
                    scrollPos = $(window).scrollTop();
                    $(".st-content").appendTo(".st-pusher");
                    $(".masthead").prependTo("#st-container");
                    $(".masthead").removeClass('is-fixed');

                    if($('body').hasClass('page-home')) {
                        union.feature.unbindScroll();
                    }
                    union.video.pause();

                    $("body, html,.st-container").height('100%');
                    $(".st-pusher").scrollTop(scrollPos);
                    $(window).trigger('scroll');
                }

                $("#st-container").toggleClass("menu-open");
            });
        }
    };
})();
/*-----------------------
 @TIMER
 ------------------------*/
union.timer = (function() {
    var timer = null;

    return {
        drawTimer: function()
        {
            var $circle = $(".feature-timer"),
                    $bg = $(".feature-background");

            var degrees = 360, // don't change this
                    i = 0;

            var radius = 120, // circle radius relative to svg viewbox (be sure to account for stroke width)
                    increment = 5, // number of degrees to add per loop
                    angle = -90 - increment, // start position (top minus an increment)
                    numTicks = (degrees / increment) + 2, // number of times the loop will run
                    ms = union.feature.s.constants.pause - union.feature.s.constants.speed - 400, // duration of animation (milliseconds)
                    interval = ms / numTicks; // timer interval

            var radians = null,
                    x = null,
                    y = null,
                    d = null;

            timer = setInterval(
                function() {
                    angle += increment;
                    angle %= degrees;
                    radians = (angle / (degrees / 2)) * Math.PI;
                    x = 150 + Math.cos(radians) * radius;
                    y = 150 + Math.sin(radians) * radius;
                    d = $circle.attr("d");

                    if (i == 0) {
                        d = d + " M " + x + " " + y;
                    }
                    else {
                        d = d + " L " + x + " " + y;
                    }
                    $circle.attr("d", d);
                    i++;

                    if (i >= numTicks) {
                        union.timer.stopTimer();
                        union.feature.$bxapi.goToNextSlide();
                    }
                }, interval);
        },
        stopTimer: function()
        {

            clearInterval(timer);
        }
    }
})();
/*-----------------------
 @FEATURE (HOME)
 ------------------------*/
union.feature = (function() {
    var $bxapi = {},
        inTransition = 0,
        mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    return {
        s: {
            classes: {
                i: "carousel",
                e: "is-enabled",
                p: "pager"
            },
            constants: {
                delay: 250,
                pause: 6000,
                speed: 800
            },
            obj: {
                pager: $("<div class='pager' />")
            },
            svg: {
                // "bg" is just a copy of a generated timer saved via Developer Tools
                // if the timer dimensions change this will need to be replaced
                // also, change the stroke-width to be less than #feature-timer so it doesn't poke out from underneath
                bg: '<svg version="1.1" id="feature-timer-background" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="612px" height="792px" viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve"><path fill="#FFFFFF" d="M306,685.8l-25.3-1.1l-25.1-3.3L231,676l-24.1-7.6l-23.4-9.7L161.1,647l-21.3-13.6L119.7,618L101.1,601 L84,582.3l-15.4-20.1L55,540.9l-11.7-22.4l-9.7-23.4L26,471l-5.5-24.7l-3.3-25.1L16.2,396l1.1-25.3l3.3-25.1L26,321l7.6-24.1 l9.7-23.4L55,251.1l13.6-21.3L84,209.7l17.1-18.6l18.6-17.1l20.1-15.4l21.3-13.6l22.4-11.7l23.4-9.7L231,116l24.7-5.5l25.1-3.3 l25.3-1.1l25.3,1.1l25.1,3.3L381,116l24.1,7.6l23.4,9.7l22.4,11.7l21.3,13.6l20.1,15.4l18.6,17.1l17.1,18.6l15.4,20.1l13.6,21.3 l11.7,22.4l9.7,23.4L586,321l5.5,24.7l3.3,25.1l1.1,25.3l-1.1,25.3l-3.3,25.1L586,471l-7.6,24.1l-9.7,23.4L557,540.9l-13.6,21.3 L528,582.3L511,601L492.3,618l-20.1,15.4L450.9,647l-22.4,11.7l-23.4,9.7L381,676l-24.7,5.5l-25.1,3.3L306,685.8z M288.6,595 l17.4,0.8l17.4-0.8l17.3-2.3l17-3.8l16.6-5.2l16.1-6.7l15.5-8l14.7-9.4l13.8-10.6l12.8-11.8l11.8-12.8l10.6-13.8l9.4-14.7l8-15.5 l6.7-16.1l5.2-16.6l3.8-17l2.3-17.3l0.8-17.4l-0.8-17.4l-2.3-17.3l-3.8-17l-5.2-16.6l-6.7-16.1l-8-15.5l-9.4-14.7L459,267.6 l-11.8-12.8L434.4,243l-13.8-10.6l-14.7-9.4l-15.5-8l-16.1-6.7l-16.6-5.2l-17-3.8l-17.3-2.3l-17.4-0.8l-17.4,0.8l-17.3,2.3l-17,3.8 l-16.6,5.2l-16.1,6.7l-15.5,8l-14.7,9.4L177.6,243l-12.8,11.8L153,267.6l-10.6,13.8l-9.4,14.7l-8,15.5l-6.7,16.1l-5.2,16.6l-3.8,17 l-2.3,17.3l-0.8,17.4l0.8,17.4l2.3,17.3l3.8,17l5.2,16.6l6.7,16.1l8,15.5l9.4,14.7l10.6,13.8l11.8,12.8l12.8,11.8l13.8,10.6 l14.7,9.4l15.5,8l16.1,6.7l16.6,5.2l17,3.8L288.6,595z"/></svg>',
                anim: "<svg id='feature-timer' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' preserveAspectRatio='xMidYMid' viewbox='0 0 300 300'><path class='feature-timer' stroke-width='60' d='M300,300' fill='none' /></svg>",
                bull: "&bull;"
            },
            colors: {
                union: "#f6364d",
                mccollcenter: "#65d28a",
                dublindog: "#68c223",
                amcc: "#ea0023",
                dukeenergy: "#d1f787",
                hendrick: "#ea0023",
                sonamedspa: "#f09026",
                cpisecurity: "#ea0023",
                operacarolina: "#be000b",
                afm: "#6aa74b"
            },
            txt: {
                union: "#f5f5f5",
                mccollcenter: "#2c2e33",
                dublindog: "#24334c",
                amcc: "#f5f5f5",
                dukeenergy: "#f5f5f5",
                hendrick: "#2c2e33",
                sonamedspa: "#451a3b",
                cpisecurity: "#f5f5f5",
                operacarolina: "f5f5f5",
                afm: "f5f5f5"
            }
        },
        init: function()
        {
            var t = window.setTimeout(kickoff, union.feature.s.constants.delay);
            function kickoff()
            {
                scrollTripped = 1; // REMOVE THIS LINE if we want the slides to cycle through automatically
                $("html").css({height: "100%", overflow: "hidden"}); //set html to 100

                var s = union.feature.s;
                var $c = $("." + s.classes.i),
                        $items = $c.find(".item");

                if ($items.length) {
                    union.feature.resizeItems();

                    FrameEvents.on(window, 'resize', union.feature.resizeItems);

                    union.feature.enable(s, $c, $items);
                }
                // jQuery Color plugin
                $.Color.hook("fill");
                if(union.main.isTouchDevice()) {
                    document.body.addEventListener('touchmove',function(event){
                        event.preventDefault();
                    });
                }
                union.video.init();
            }
        },
        resizeItems: function() {
            var s = union.feature.s;
            var $c = $("." + s.classes.i),
                    $items = $c.find(".item");
            $items.css("height", $(window).height());
            $items.find(".screenshot").each(function(index, item) {

                var h = $(item).height();
                var w = $(item).width();
                var vh = $(window).height();
                var vw = $(window).width();
                var padding = 0.35 * vw;
                if (h - 30 > vh - padding) {
                    $(item).css({bottom: vh - padding - h, left: vw / 2 - w / 2});
                } else {
                    $(item).css({bottom: "-10px", left: vw / 2 - w / 2});
                }

            });
        },
        enable: function(s, $c, $items)
        {
            var $pager = $("." + s.classes.p);

            union.feature.$bxapi = $c.bxSlider({
                minSlides: 1,
                maxSlides: 1,
                auto: false,
                useCSS: true,
                responsive: true,
                preloadImages: "all",
                controls: false,
                mode: "vertical",
                pagerCustom: $pager,
                slideMargin: 0,
                pause: s.constants.pause,
                speed: s.constants.speed,
                touchEnabled: true,
                oneToOneTouch: false,
                infiniteLoop: false,
                onSliderLoad: function(currentIndex) {
                    $c.addClass(s.classes.e);
                    union.feature.setClient(s, currentIndex, $items);
                    union.feature.setActive(s, currentIndex, $pager, $items);
                },
                onSlideBefore: function($slideElement, oldIndex, newIndex) {
                    union.feature.hide(s, oldIndex, newIndex, $items, $pager);
                    union.feature.setClient(s, newIndex, $items);
                    union.timer.stopTimer();
                    if(scrollTripped) inTransition = 1;
                },
                onSlideAfter: function($slideElement, oldIndex, newIndex) {
                    union.feature.setActive(s, newIndex, $pager, $items);
                    setTimeout(function() {
                        inTransition = 0;
                    },1000);
                    if($c.getCurrentSlide() == ($c.getSlideCount() - 1)) {
                        $('body').bind('swipeup',function() {
                            union.feature.scrollToInfo();
                        });
                    }
                    else {
                        $('body').unbind('swipeup');
                    }
                }
            });
            $slider = $c;
            union.feature.bindScroll();
            $('body').on('click', '.to-case-studies', function(e) {
                e.preventDefault();
                $c.goToNextSlide();
            });
            $('#pager-show-content').on('click', function(e) {
                e.preventDefault();
                union.feature.unbindScroll();
                union.feature.bindContent();
            });
        },
        setClient: function(s, i, $items)
        {
            var $pager = $("." + s.classes.p);
            var newProject = $items.eq(i).attr("data-project");

            $("body").attr("data-project", newProject);

            if(newProject !== "union") union.hpvideo.scrolled();
            else union.hpvideo.play();
        },
        setActive: function(s, i, $pager, $items)
        {
            var newProject = $items.eq(i).attr("data-project");
            var currentColor = s.colors[newProject.replace("-", "")];
            if(!scrollTripped) currentColor = s.txt[newProject.replace("-", "")];

            $pager.find(".animated").removeClass("animated");
            $pager.find("a").eq(i).html(s.svg.bg + s.svg.anim);
            $('#feature-timer-background *').css('fill',currentColor);

            if(newProject !== "union") union.hpvideo.scrolled();
            else union.hpvideo.play();

            if(!scrollTripped) {
                $pager.find("a").eq(i).addClass("animated");
                union.timer.drawTimer();
            }

            union.main.setLogoColors(s.colors[newProject.replace("-", "")], s.txt[newProject.replace("-", "")]);
            union.feature.setPagerColor($pager, s.txt[newProject.replace("-", "")]);
            $('.menu-trigger span').animate({
                backgroundColor: s.txt[newProject.replace("-", "")]
            }, s.constants.speed);
        },
        hide: function(s, oldIndex, newIndex, $items, $pager)
        {
            var currentProject = $items.eq(oldIndex).attr("data-project");
            var newProject = $items.eq(newIndex).attr("data-project");
            var currentColor = s.colors[currentProject.replace("-", "")];

            $pager.find("a").eq(oldIndex).html(s.svg.bull);
            $pager.find("a").eq(newIndex).html(s.svg.bg);

            $('#feature-timer-background *').css('fill',currentColor);
        },
        setPagerColor: function($pager, color)
        {
            var realColor = $('body').attr('data-project') == "content" ? '#61625F' : color;

            $pager.find("a").animate({
                color: realColor
            }, 200);
        },
        bindScroll: function()
        {
            if(!union.main.isMobile) {
                var currentActive,
                    totalSlides = $slider.getSlideCount(),
                    s = union.feature.s;
                $('body').bind(mousewheelevt, function(e){
                    scrollTripped = 1;
                    currentActive = $slider.getCurrentSlide();

                    var evt = window.event || e;
                    evt = evt.originalEvent ? evt.originalEvent : evt;
                    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;

                    $slider.stopAuto();
                    if(delta > 0) {
                        if(currentActive > 0 && !inTransition) $slider.goToPrevSlide();
                    }
                    else {
                        if(currentActive < (totalSlides - 1) && !inTransition) {
                            $slider.goToNextSlide();
                        }
                        if(currentActive = totalSlides && !inTransition) {
                            union.feature.unbindScroll();
                            union.feature.bindContent();
                        }
                    }
                });
                $('.' + s.classes.p).find('a').click(function() {
                    scrollTripped = 1;
                });
            }
        },
        rebindScroll: function()
        {
            if(!union.main.isMobile) {
                $('body').unbind(mousewheelevt);
                union.feature.bindScroll();
            }
        },
        unbindScroll: function()
        {
            if(!union.main.isMobile) {
                $('body').unbind(mousewheelevt);
            }
        },
        bindContent: function()
        {
            if(!union.main.isMobile) {
                var s = union.feature.s;
                var timer;
                var $c = $("." + s.classes.i),
                $items = $c.find(".item");
                var $pager = $("." + s.classes.p);

                $('body').addClass('show-content');
                $('html').css({height: 'auto', overflow: 'auto'});
                $('#features').css({position: "static"});
                $('.masthead').addClass('is-fixed');
                union.feature.setContentActive(s);
                union.feature.unbindScroll();

                $(window).on('scroll', function(e){
                    if($(window).scrollTop() === 0) {
                        $(window).unbind('scroll');
                        $.data(this, 'timer', setTimeout(function() {
                            $('body').removeClass('show-content');
                            $('html').css({height: '100%', overflow: 'hidden'});
                            $('#features').css({position: 'fixed'});
                            $('.masthead').removeClass('is-fixed');

                            union.feature.setClient(s, union.feature.$bxapi.getSlideCount() - 1, $items);
                            union.feature.setActive(s, union.feature.$bxapi.getSlideCount() - 1, $pager, $items);
                            union.feature.unsetContentActive();
                        }, 500));
                    }
                });
            }
        },
        setContentActive: function(s)
        {
            var newProject = "union";
            union.main.setLogoColors(s.colors[newProject.replace("-", "")], s.txt[newProject.replace("-", "")]);
            $('.menu-trigger span').animate({
                backgroundColor: s.txt['union']
            }, s.constants.speed);
        },
        unsetContentActive: function()
        {
            var timer;
            clearTimeout(timer);
            timer = setTimeout(function() { union.feature.rebindScroll(); }, 900);
        },
    };
})();
/*-----------------------
 @CAROUSEL
 ------------------------*/
union.carousel = (function() {
    var settings = {
        $el: $(".m_carousel ul"),
        slideWidth: 960
    }

    return {
        prep: function() {
            if (union.main.windowWide()) {

                // all carousel items
                var $items = settings.$el
                        .filter(".consolidate-items")
                        .children(".carousel-item");

                // consolidate in the first carousel
                settings.$el
                        .filter(".consolidate-items")
                        .first()
                        .html($items)
                        .addClass("master");

                // remove the others
                settings.$el.filter(":not('.master')")
                        .closest(".tab-item")
                        .remove();
            }

            union.carousel.init();
        },
        init: function() {
            // allow multiple carousels per page
            settings.$el.each(function() {

                var $c = $(this),
                        $m = $c.closest(".m_carousel"),
                        enableCaptions = $m.hasClass("enable-captions"),
                        enableTabControls = $m.hasClass("enable-tab-controls") && union.main.windowWide();

                var $bxapi = $c.bxSlider({
                    captions: false, // always handle captions manually
                    controls: false,
                    oneToOneTouch: false,
                    pager: false,
                    slideWidth: settings.slideWidth,
                    swipeThreshold: 200,
                    onSliderLoad: function(currentIndex) {
                        // first active item
                        var $active = $c.find(".carousel-item").not(".bx-clone").eq(currentIndex);
                        $active.addClass("active");

                        // insert caption container if enabled
                        if (enableCaptions) {
                            union.carousel.insertCaptions($m, $c, $active);
                        }

                        // add controls
                        union.carousel.insertControls($c);
                    },
                    onSlideAfter: function($slideElement, oldIndex, newIndex) {
                        $c.find(".active").removeClass("active");
                        $slideElement.addClass("active");

                        if (enableCaptions) {
                            union.carousel.updateCaption($m, $c, $slideElement);
                        }
                        if (enableTabControls) {
                            union.carousel.setActiveTab($c, $slideElement);
                        }
                    }
                });

                // enable controls
                union.carousel.bindControls($c, $bxapi);
                enableTabControls
                        ? union.carousel.bindTabControls($c, $bxapi)
                        : null;
            });
        },
        // insert prev / next controls
        insertControls: function($c) {
            $c.parent(".bx-viewport").append(
                    "<a href='#' class='my-control my-bx-prev' />",
                    "<a href='#' class='my-control my-bx-next' />"
                    );
        },
        // bind prev / next controls
        bindControls: function($c, $bxapi) {
            $c.nextAll(".my-bx-prev").on("click", function(e) {
                e.type; // fixes click on ipad. don't know why.
                e.preventDefault();
                $bxapi.goToPrevSlide();
            });
            $c.nextAll(".my-bx-next").on("click", function(e) {
                e.preventDefault();
                $bxapi.goToNextSlide();
            });
        },
        // tab + carousel hybrid
        // go to a slide based on the selected tab
        // example: /about/culture
        bindTabControls: function($c, $bxapi) {
            var slideHash,
                    slideIndex;
            $c.closest(".m_tabs").find(".tab-selectors .tab-item-cell").on("click", function(e) {
                e.stopPropagation();
                e.preventDefault();
                slideHash = $(this).attr("href").replace("#", "");
                slideIndex = $c.find("[data-slide-hash='" + slideHash + "']").not(".bx-clone").index();
                $bxapi.goToSlide(slideIndex - 1);
            });
        },
        // tab + carousel hybrid
        // make tab active based on current slide
        // example: /about/culture
        setActiveTab: function($c, $slideElement) {
            var $tabs = $c.closest(".m_tabs").find(".tab-selectors .tab-item-cell"),
                    $activeTab = $tabs.filter(".active"),
                    activeTabHash = $activeTab.attr("href").replace("#", ""),
                    slideHash = $slideElement.attr("data-slide-hash");

            if (activeTabHash !== slideHash) {
                $activeTab.removeClass("active");
                $tabs.filter("[href='#" + slideHash + "']").addClass("active");
            }
        },
        // insert caption container
        insertCaptions: function($m, $c, $active) {
            $m.append("<div class='my-bx-caption' style='max-width:" + settings.slideWidth + "px'></div>");
            union.carousel.updateCaption($m, $c, $active);
        },
        // update caption on slide change
        updateCaption: function($m, $c, $slideElement) {
            $m.find(".my-bx-caption").text($slideElement.find("img").attr("title"));
        },
    };
})();
/*-----------------------
 @AMAZING MAGICALLY MUTATING TABS

 Originally based on http://codepen.io/chriscoyier/pen/gHnGD
 Modified beyond recognition. Don't try this at home.
 ------------------------*/
union.tabs = (function() {
    var selectorCount = 0;
    return {
        settings: {
            $el: $(".m_tabs"),
            $selectorWrap: $("<div class='row tab-selectors'></div>")
        },
        init: function()
        {
            var $t,
                moduleType;

            this.settings.$el.each(function() {
                $t = $(this);
                var isTeam = $(this).hasClass('team');

                // "large" screen
                if (union.main.windowWide() || $('body').hasClass('page-services')) {
                    moduleType = "tabs";

                    union.tabs.upgradeTags($t, isTeam);
                    union.tabs.enableModule($t, moduleType, isTeam);
                    union.tabs.buildSelectors($t, moduleType, isTeam);
                    union.tabs.pageLoadActiveItem($t.not('[data-not-expanded]'), moduleType, isTeam, true);
                    union.tabs.loadActiveTab($t, moduleType);
                    union.tabs.bindUIfunctions($t, moduleType, isTeam);
                }
                // "small" screen & transform to accordion
                else if ($t.hasClass("m_accordion")) {
                    moduleType = "accordion";

                    union.tabs.upgradeTags($t, isTeam);
                    union.tabs.enableModule($t, moduleType, isTeam);
                    union.tabs.buildSelectors($t, moduleType, isTeam);
                    union.tabs.pageLoadActiveItem($t, moduleType, isTeam, true);
                    union.tabs.loadActiveTab($t, moduleType);
                    union.tabs.bindUIfunctions($t, moduleType, isTeam);
                }
            });
        },
        // reconfigure DOM
        upgradeTags: function($t, isTeam)
        {
            var $el,
                $tagHTML,
                newTag;

            // replace tags first, it takes the most work
            $t.find("[data-upgrade-tag]").each(function() {
                $el = $(this);
                $tagHTML = $el.html();

                newTag = $("<" + $el.attr("data-upgrade-tag") + " />");
                if ($el.attr("data-upgrade-tag") === "a") {
                    if ($el.attr("data-upgrade-hash").length) {
                        newTag.attr("href", $el.attr("data-upgrade-hash"));
                    } else {
                        newTag.attr("href", "#");
                    }
                }

                newTag.addClass($el.attr("data-upgrade-class")).html($tagHTML);
                $el.replaceWith(newTag);
            });

            // simple replaces for classes
            $t.find("[data-upgrade-class]").each(function() {
                $(this)
                        .attr("class", $(this).attr("data-upgrade-class"))
                        .removeAttr("data-upgrade-class");
            });
        },
        enableModule: function($t, moduleType, isTeam)
        {
            $t.removeClass(moduleType + "-disabled").addClass(moduleType + "-enabled");
        },
        buildSelectors: function($t, moduleType, isTeam)
        {
            if (moduleType == "tabs") {
                if(isTeam) {
                    var $newRow = $('<div class="row tab-selectors"></div>');
                    $t.find('[data-tab-selector]').each(function(i, el) {
                        selectorCount++;
                        $(el).appendTo($newRow);

                        if(selectorCount == 4) {
                            $newRow.insertBefore($t.find('.tab-content'));

                            $newRow = $("<div class='row tab-selectors'></div>");
                            selectorCount = 0;
                        }
                    });
                    $newRow.insertBefore($t.find('.tab-content'));
                    $('.row').after('<div class="content-container"></div>');
                } else {
                    // build
                    $t.find("[data-tab-selector]").appendTo(union.tabs.settings.$selectorWrap);
                    // insert
                    union.tabs.settings.$selectorWrap.insertAfter($t.find(".module-heading").first());
                }
            }

            if (moduleType == "accordion") {
                // build
                $t.find("[data-accordion-tab]").attr("class", "accordion-tab-cell").wrap("<div class='row accordion-tab' />");
                // flag content
                $t.find(".accordion-tab").next(".row").addClass("accordion-content");
            }
        },
        bindUIfunctions: function($t, moduleType, isTeam)
        {
            if (moduleType == "tabs") {
                if (!$t.hasClass('m_tabs--ignoreUI')) {
                    if ($t.hasClass('m_tabs--pushstate')) {
                        if (window.history) {
                            $t.children(".tab-selectors")
                                .on("click", "a", function(e) {
                                    e.preventDefault();
                                    if (union.main.windowWide() || $('body').hasClass('page-services')) {
                                        union.tabs.changeTab($t, $(this).attr('href'), {
                                            isTeam: isTeam,
                                            collapse: $(this).hasClass('active')
                                        });
                                    }
                                });

                            $(window).on('popstate.mTabs', function(e) {
                                union.tabs.changeTab($t, window.location.pathname, {
                                    isTeam: isTeam,
                                    popState: true
                                });
                            })
                        }
                    }
                    else {
                        $t.children(".tab-selectors")
                            .on("click", "a", function(e) {
                                if (union.main.windowWide() || $('body').hasClass('page-services')) {
                                    e.preventDefault();
                                }
                            })
                            .on("click", "a[href^='#']", function(e) {
                                if (union.main.windowWide() || $('body').hasClass('page-services')) {
                                    union.tabs.changeTab($t, this.hash, {
                                        isTeam: isTeam,
                                        collapse: $(this).hasClass('active')
                                    });
                                }
                            });
                    }
                }
            }

            if (moduleType == "accordion") {
                $t.find(".tab-item .accordion-tab")
                    .on("click", function(e) {
                        e.preventDefault();

                        var $tabItem = $(this).parents('.tab-item');
                        union.tabs.toggleAccordion($t, $tabItem);
                    });
            }
        },
        pageLoadActiveItem: function($t, moduleType, isTeam, isInitial)
        {
            if (moduleType == "tabs") {
                var activeTab;

                var hash = document.location.hash.length
                        ? document.location.hash
                        : false;

                if ($t.hasClass('m_tabs--pushstate')) {
                    if (( activeTab = $t.find(".tab-selectors a").filter(function() {
                            return this.href == window.location;
                        })).length) {
                        hash = activeTab.attr('href');
                    }
                    else {
                        hash = $t.find(".tab-selectors a").first().attr("href");
                    }
                }
                else {
                    // if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
                    if (!hash || !$t.find(".tab-selectors #" + hash.replace("#", "")).length) {
                        hash = "#" + $t.children(".tab-content").children(".tab-item").first().attr("id");
                    }
                }

                this.changeTab($t, hash, {
                    isTeam: isTeam,
                    collapse: false
                }, isInitial);
            }

            if (moduleType == "accordion") {
                $t.find(".accordion-tab").first().parent(".tab-item").addClass("active");
                $t.find(".tab-content .tab-item").not(".active").children(".accordion-content").hide();
            }
        },

        loadActiveTab: function($t, moduleType) {
            var hash = $.trim( window.location.hash );
            var anchor = $("[href='" + hash + "']");
            var rowContent = $(anchor).parents('.row').next('.content-container');
            var div = $(hash.indexOf('#') > -1 ? hash : '#'+hash.split('/').reverse()[0]);

            if (hash) {
                if (moduleType == "tabs") {
                    anchor.addClass('active');
                    div.clone().appendTo(rowContent).addClass('active');
                    rowContent.addClass('active');

                    $('html, body').animate({
                        'scrollTop': anchor.offset().top - 100
                    }, 1000, 'linear');
                }

                if (moduleType == "accordion") {
                    $t.find(".accordion-tab").first().parent(".tab-item").removeClass("active");
                    $t.find(anchor).parents(".tab-item").addClass("active");
                    $t.find(".tab-content .tab-item").not(".active").children(".accordion-content").hide();
                    $t.find(".active").children(".accordion-content").css({ "display": "block" });

                    $('html, body').animate({
                        'scrollTop': $t.find(".tab-item.active").offset().top - 220
                    }, 1000, 'linear');
                }
            }
        },

        // tabs only
        changeTab: function($t, hash, o, isInitial)
        {
            var anchor = $t.find("[href='" + hash + "']").closest(".tab-item-cell");
            var rowContent = anchor.parents('.row').next('.content-container');
            var div = $(hash.indexOf('#') > -1 ? hash : '#'+hash.split('/').reverse()[0]);
            if ($('.tab-services-header').length) {
                var tabs_header_div = $(hash.indexOf('#') > -1 ? hash : '#tabs_header_'+hash.split('/').reverse()[0]);
            }

            if(o.isTeam) {
                if(o.collapse) {
                    $('.content-container.active').empty().removeClass('active');
                    anchor.removeClass('active');
                } else {
                    $('.tab-selectors').find('.active').removeClass('active');
                    anchor.addClass('active');

                    // activate content
                    $('.content-container').empty().find('.tab-item').removeClass('active');
                    div.clone().appendTo(rowContent).addClass('active');
                    $('.content-container').removeClass('active');
                    rowContent.addClass('active');
                }
                $('.tab-item-cell .jump').text('Expand');
                anchor.find('.jump').text(o.collapse ? 'Expand' : 'Collapse');
            } else {
                // activate selector
                anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

                // activate content
                div.addClass("active").siblings().removeClass("active");

                if ($('.tab-services-header').length) {
                    tabs_header_div.addClass("active").siblings().removeClass("active");

                    if(!union.main.isMobile) {
                        if($('.page-services-detail .m_jumbotron .video-container').length > 1) {
                            var inActive = $('video').not('#service_video_'+hash.split('/').reverse()[0]),
                            active = $('#service_video_'+hash.split('/').reverse()[0]);

                            inActive[0].pause();
                            active[0].play();

                            inActive.parent().hide();
                            active.parent().show();

                        } else {
                            if(!union.main.isMobile) {
                                $('.page-services-detail .m_jumbotron video').get(0).play();
                            }
                        }
                    } else {
                        if($('.page-services-detail .m_jumbotron .video-container').length > 1) {
                            var inActive = $('.video-container').not('.'+hash.split('/').reverse()[0]),
                            active = $('.'+hash.split('/').reverse()[0]);

                            inActive.hide();
                            active.show();

                        }
                    }
                }

                // update URL, no history addition
                // You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
                if (!isInitial && !o.popState && $t.hasClass('m_tabs--pushstate')) {
                    window.history.replaceState("", "", hash);
                    // var titleBits = hash.trim().split('/').reverse();
                    // var title = '';
                    // $.each(titleBits, function(i, str) {
                    //  title += ' | ' + ucwords(str.replace('-', ' '));
                    // });
                    // document.title = title.slice(3);
                    document.title = anchor.parent().data('meta-title');
                }
            }
        },
        // accordion only
        toggleAccordion: function($t, $clickedTab, isTeam)
        {
            if (!$clickedTab.hasClass("active")) {
                $t.find(".tab-item.active").removeClass("active").children(".accordion-content").slideUp("fast");
                $clickedTab.addClass("active").children(".accordion-content").slideDown("fast", function() {
                    union.tabs.positionAccordion($t);
                });
            } else {
                $clickedTab.removeClass("active").children(".accordion-content").slideUp("fast");
            }
        },
        positionAccordion: function($t, isTeam)
        {
            $(".st-content").scrollTo($t.find(".module-heading"), 400);
        },
    }
})();
/*-----------------------
 @PILL TABS
 ------------------------*/
union.pillTabs = {
    settings: {
        $el: $(".m_pill-tabs"),
    },
    init: function()
    {
        var $t;

        this.settings.$el.each(function() {
            $t = $(this);

            union.pillTabs.enableModule($t);
            union.pillTabs.bindUIfunctions($t);
            union.pillTabs.pageLoadActiveItem($t);
        });
    },
    enableModule: function($t, moduleType)
    {
        $t.removeClass("pill-tabs-disabled").addClass("pill-tabs-enabled");
    },
    bindUIfunctions: function($t, moduleType)
    {
        $t.children(".pill-tab-selectors")
                .on("click", "a", function(e) {
                    e.preventDefault();
                })
                .on("click", "a[href^='#']:not('.active')", function(e) {
                    union.pillTabs.changeTab($t, this.hash);
                });
    },
    pageLoadActiveItem: function($t)
    {
        var hash = document.location.hash.length
                ? document.location.hash
                : false;

        // if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
        if (!hash || !$t.find(".pill-tab-selectors #" + hash.replace("#", "")).length) {
            hash = "#" + $t.children(".pill-tab-content").children(".pill-tab-item").first().attr("id");
        }

        this.changeTab($t, hash);
    },
    // tabs only
    changeTab: function($t, hash)
    {
        var anchor = $("[href=" + hash + "]");
        var div = $(hash);

        // activate selector
        anchor.removeClass("pill-inactive").parent().siblings().find(".pill").addClass("pill-inactive");

        // activate content
        div.addClass("active").siblings().removeClass("active");

        // update URL, no history addition
        // You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
        // window.history.replaceState("", "", hash);
    },
}
/*-----------------------
 @BASIC TABS

 Either vertical or horizonal. Probably only used in case studies.
 ------------------------*/
union.basicTabs = {
    settings: {
        $el: $(".m_tabs-vertical").add(".m_tabs-horizontal"),
    },
    init: function()
    {
        var $t,
                moduleType;

        this.settings.$el.each(function() {
            $t = $(this);

            if ($t.hasClass("m_tabs-vertical")) {
                moduleType = "vertical";
            } else if ($t.hasClass("m_tabs-horizontal")) {
                moduleType = "horizontal";
            }
            union.basicTabs.enableModule($t, moduleType);
            union.basicTabs.bindUIfunctions($t, moduleType);
            union.basicTabs.pageLoadActiveItem($t, moduleType);
        });
    },
    enableModule: function($t, moduleType)
    {
        $t.addClass("tabs-" + moduleType + "-enabled");
    },
    bindUIfunctions: function($t, moduleType)
    {
        $t.find(".tabs-" + moduleType + "-selectors")
                .on("click", "a", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                })
                .on("click", "a[href^='#']:not('.active')", function(e) {
                    union.basicTabs.changeTab($t, this.hash);
                });
    },
    pageLoadActiveItem: function($t, moduleType)
    {
        var hash = document.location.hash.length
                ? document.location.hash
                : false;

        // if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
        if (!hash || !$t.find(".tabs-" + moduleType + "-selectors #" + hash.replace("#", "")).length) {
            hash = "#" + $t.find(".tabs-" + moduleType + "-content").children(".tab-item").first().attr("id");
        }
        this.changeTab($t, hash);
    },
    // tabs only
    changeTab: function($t, hash)
    {
        var anchor = $("[href=" + hash + "]");
        var div = $(hash);

        // activate selector
        anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

        // activate content
        div.addClass("active").siblings().removeClass("active");

        // update URL, no history addition
        // You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
        // window.history.replaceState("", "", hash);
    },
}
/*-----------------------
 @TELEPORT
 ------------------------*/
union.teleport = (function() {
    var settings = {
        $el: $(".m_teleport"),
        $close: $("#tmp_close"),
    };

    return {
        init: function() {
            settings.$el.each(function() {
                var $m = $(this);

                if (union.main.windowWide()) {
                    union.teleport.enableModule($m);
                    union.teleport.bindUIfunctions($m);
                } else {
                    $m.find(".teleport-selectors").slideUp(); // hide() is buggy on iOS
                    $m.find(".module-heading").on("click", function() {
                        $(this).toggleClass("is-open");
                        $m.find(".teleport-selectors").slideToggle();
                    });
                }
            });
        },
        enableModule: function($m)
        {
            $m.removeClass("teleport-disabled").addClass("teleport-enabled");
        },
        bindUIfunctions: function($m)
        {
            if (!$m.hasClass('m_teleport--alwaysopen')) {
                $m.on("click", ".close", function(e) {
                    e.preventDefault();
                    union.teleport.revert($m);
                });
            }
            else {
                $m.find('.close').remove();
                union.teleport.changeTab($m, $m.find('.teleport-selectors .teleport-item-cell').first().get(0).hash, {
                    initialLoad: true
                });
            }

            $m.children(".teleport-selectors").on("click", ".teleport-item-cell", function(e) {
                union.teleport.changeTab($m, this.hash);
                e.preventDefault();
            });
        },
        insertNodes: function($t)
        {
            var $closeBtn = settings.$close.clone().removeAttr("id");

            $t.html($closeBtn);
        },
        changeTab: function($m, hash, o)
        {
            var anchor = $("[href=" + hash + "]").closest(".teleport-item-cell");
            var $newTextHolder = $m.find(".teleport-new-text");
            var div = $(hash);

            // keep track of active tab
            anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

            if (!$m.hasClass('m_teleport--alwaysopen')) {
                union.teleport.insertNodes($newTextHolder);
                $newTextHolder.find(".close").show();
            }

            // send content to bucket
            $newTextHolder.html(div.html());

            if (!o || !o.initialLoad) {
                $('html,body').clearQueue().animate({
                    scrollTop: ($m.find('.anchor-here').offset().top - $('.masthead').outerHeight())
                },1000);
            }
        },
        revert: function($m)
        {
            var $newTextHolder = $m.find(".teleport-new-text");

            $newTextHolder.empty();
            $newTextHolder.find(".close").hide();
            $m.children(".teleport-selectors").find(".active").removeClass("active");
        }
    };
})();
union.modal = (function() {
    var settings = {
        $el: $(".m_modal"),
        $appendModalTo: $("body"),
        $close: $("#tmp_close"),
        $backdrop: $("<div class='modal-backdrop' />"),
        $modalWrapper: "<div class='modal-content'></div>"
    };
    var htmlHeight = 0;
    var scrollPos = 0;
    return {
        init: function() {
            // insert backdrop
            settings.$backdrop.appendTo(settings.$appendModalTo);

            // each
            settings.$el.each(function() {
                var $m = $(this);

                union.modal.bindUIfunctions();
                union.modal.insertModal($m);
            });

            // close modal with esc
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    union.modal.closeModal($(".m_modal"));
                }
            });

            // if (window.location.hash) {
            //     union.modal.openModal($("#" + window.location.hash.replace("#", "")));
            // }
        },
        insertModal: function($m) {
            // insert close button
            $m.prepend(settings.$close.clone().removeAttr("id"));

            // add wrapper
            $m.wrapInner(settings.$modalWrapper);

            // insert modal before $backdrop
            $m.addClass("is-enabled").insertBefore(settings.$backdrop).hide();
        },
        bindUIfunctions: function() {
            var hash;

            $(".show-modal").on("click", function(e) {
                if (e.ctrlKey || e.metaKey) return;
                e.preventDefault();

                union.modal.openModal($("#" + this.hash.replace("#", "")));
            });
            $(".m_modal").on("click", ".close", function(e) {
                e.preventDefault();
                union.modal.closeModal($(this).closest(".m_modal"));
            });
        },
        openModal: function($m) {
            // show backdrop
            if (!union.main.isMobile) {
                htmlHeight = $("html").height();
                scrollPos = $(window).scrollTop();
                $("body, html,.st-container").height("100%");
            }
            settings.$backdrop.fadeIn('fast', function() {
                // show modal
                $m.show();
                if($(".video-embed iframe",$m).length) {
                    var video = Wistia.api($(".video-embed",$m).data("video-id"));
                    video.play();
                    video.bind('play', function() {
                        // when one video plays, iterate over all the videos and pause each,
                        // unless it's the video that just started playing.
                        var allVideos = Wistia.api.all();
                        for (var i = 0; i < allVideos.length; i++) {
                          if (allVideos[i].hashedId() !== video.hashedId()) {
                            allVideos[i].pause();
                          }
                        }
                    });
                }
            });
        },
        closeModal: function($m) {
            // hide modal
            if (!union.main.isMobile) {
                //$("html,.st-content").height(htmlHeight + "px");
                $(".st-container ").height("0px");
                $("body, html").removeAttr("style");
                $(window).scrollTop(scrollPos);
                if($(".video-embed iframe",$m).length) {
                    var video = Wistia.api($(".video-embed",$m).data("video-id"));
                    video.pause();
                }
            }
            $m.fadeOut('fast', function() {
                // hide backdrop
                settings.$backdrop.hide();
            });
        }
    };
})();
/*-----------------------
 @INLINESVG
 Conditionally loading svg or fallback png
 ------------------------*/
union.inlinesvg = (function() {
    var $el;

    return {
        init: function() {
            for (i = 0; i < $("[data-inlinesvg]").length; i++) {
                $el = $("[data-inlinesvg]").eq(i);
                if (Modernizr.inlinesvg) {
                    $el.load($el.attr("data-inlinesvg"));
                } else {
                    $el.html("<img src='" + $el.attr("data-inlinesvg").replace(".svg", ".png") + "' />");
                }
            }
        },
    };
})();
/*-----------------------
 @PARALLAX
 Cool effect for various hero sections
 ------------------------*/
union.parallax = (function() {
    var self,
        $el,
        controller,
        parallaxActiveClass = 'parallax-active',
        heroSelector = '.m_jumbotron',
        $hero = $(heroSelector),
        heroTextSelector = heroSelector + ' .positioning',
        $heroText = $(heroTextSelector);

    return {
        props: {
            ready: false,
            isCaseStudy: $('.page-case-study').length ? true : false
        },
        settings: {
            minParallaxWidth: 1200
        },
        init: function() {
            self = this;

            if($hero.length) {
                self.bindWindowEvents();
                self.checkMedia();
            }
        },

        // Listen to window resize events, via Frame Events, and check window size
        // (disable/enable ScrollMagic if and when size requirements are met)
        // --
        bindWindowEvents: function() {
            FrameEvents.on(window, "resize", self.checkMedia);
        },

        // Only set up ScrollMagic if the window meets our size requirements
        // --
        checkMedia: function() {
            if(window.matchMedia("(min-width: " + self.settings.minParallaxWidth + "px)").matches) {
                self.enableScrollMagic();
            } else {
                self.disableScrollMagic();
            }
            // Refresh ScrollMagic scenes, if enabled, with new size vals
            if(self.props.ready === true) {
                controller.update(true);
            }
        },
        enableScrollMagic: function() {
            // Only enable if ScrollMagic is currently disabled
            if(self.props.ready === false) {
                controller = new ScrollMagic.Controller();
                $hero.addClass(parallaxActiveClass);
                if(self.props.isCaseStudy) {
                    self.prepCaseStudyParallaxScene();
                } else {
                    self.prepStandardParallaxScene();
                }
                self.props.ready = true;
            }
        },
        disableScrollMagic: function() {
            // Only disable if ScrollMagic is currently enabled
            if(self.props.ready === true) {
                controller.destroy(true);
                $hero.removeClass(parallaxActiveClass);
                self.props.ready = false;
            }
        },

        // ScrollMagic scene setup for normal parallax hero section
        // --
        prepStandardParallaxScene: function() {
            var tween = new TimelineMax()
                .add(TweenMax.from($heroText, 0, {y: "0", opacity: "1"}))
                .add(TweenMax.to($heroText, 1, {y: "150", opacity: "0"}));

            var standardScene = new ScrollMagic.Scene({
                duration: $hero.outerHeight(),
                triggerHook: 0
            })
                .setTween(tween)
                .addTo(controller);
        },

        // ScrollMagic scene setup for Case Study parallax hero section
        // --
        prepCaseStudyParallaxScene: function() {
            $heroText = $(heroSelector + ' h1');
            var tween = new TimelineMax()
                .add(TweenMax.from($heroText, 0, {y: "0", opacity: "1"}))
                .add(TweenMax.to($heroText, 1, {y: "150", opacity: "0"}));

            var caseStudyScene = new ScrollMagic.Scene({
                duration: $hero.outerHeight(),
                triggerHook: 0
            })
                .setTween(tween)
                .addTo(controller);
        }
    };
})();
/*-----------------------
 Curtain effect
 init curtain effect
 ------------------------*/
union.casestudy = (function() {
    var rTimer,
        sTimer,
        animateObjects = $(),
        sideRailCTA = $()
        isScrolling = false;

    return {
        init: function() {
            $(window).on('resize', function() {
                clearTimeout(rTimer);
                rTimer = setTimeout(function() {
                    union.casestudy.setJumbotronSize();
                }, 60);
            });

            animateObjects = $('.animate-objects');
            sideRailCTA = $('.side-rail-cta');

            union.casestudy.setJumbotronSize();
            union.casestudy.switcher();
            union.casestudy.pageLinkHover();



            if($('.page-links').length) {

                $('.section').waypoint(function(direction) {
                    var prevAnchor = this.previous() ? $(".page-links a[href=#" + this.previous().element.id + "]") : '',
                            anchor = $(".page-links a[href=#" + this.element.id + "]"),
                            prev = this.previous();

                    if( direction === 'down') {
                        anchor.addClass("active").parent().siblings().find(".active").removeClass("active");
                    } else {
                        if(prevAnchor) {
                            prevAnchor.addClass("active").parent().siblings().find(".active").removeClass("active");
                        }
                    }

                },{
                    group: 'casestudy',
                    offset: '50%'
                });
                
                $('.page-links li a').on('click', function(e) {
                    e.preventDefault();

                    var anchor = $("[href=" + this.hash + "]");
                    var target = $(this.hash);

                    anchor.addClass("active").parent().siblings().find(".active").removeClass("active");
                    union.casestudy.scrollPage(target);
                });

            }

            if($('.lockup--variant').length) {
                union.casestudy.setSupportImage();
                FrameEvents.on(window, "resize", union.casestudy.setSupportImage);
            }

        },
        setSupportImage: function() {
            var siPercentage = $('.lockup--variant').width() * 0.04,
                outerWidth = $('.lockup__wrap').outerWidth(),
                innerWidth = $('.lockup__inner').outerWidth(),
                diff = outerWidth - innerWidth,
                total = siPercentage + diff + 14,
                si = $('.lockup--variant .lockup__dart');

            si.css('margin-left','-'+total+'px');
        },
        setJumbotronSize: function() {
            var h = $(window).height();
            if($('.page-case-study').length && $(window).width() >= 1200 && $(window).height() >= 800 && !union.main.isMobile) {
                h = $(window).height() - 150;
            }
            $(".m_jumbotron").height(h);
        },
        playOrPauseHero: function() {
            var vidPlaying = true;

            clearTimeout(sTimer);
            sTimer = setTimeout(function() {
                // if($(window).scrollTop() > $(window).height()) {
                //     union.video.pause();
                // }
                // else {
                //     union.video.play();
                // }
            }, 90);
        },
        fadeInObjects: function () {
            var timeSpan = 1500; // How long each animation chunk should last

            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            var $this = animateObjects.eq(0);

            if ($this.length) {
                var $items = $this.is('ul') ? $this.find('li') : $this.find('.fade-in');

                if($this.is('[data-time-span]') && !isNaN($this.attr('data-time-span'))) {
                    timeSpan = parseInt($this.attr('data-time-span'));
                }

                if(scrollTop >= ($this.offset().top - (windowHeight * 0.85))) {
                    $items.each(function(i, el) {
                        var $item = $(el);
                        setTimeout(function() {
                            $item.addClass('show');
                        }, (i * (timeSpan / $items.length)));
                    });

                    animateObjects = animateObjects.not($this);
                }
            }

            var toggleClass = (scrollTop > 500) ? 'addClass' : 'removeClass';
            //sideRailCTA[toggleClass]('on-screen');
        },
        stickySidebar: function (trackTop) {
            var $pl = $('.page-links'),
                $scroller = $(window),
                $scrollerTop = $scroller.scrollTop(),
                $distance = trackTop - 220;

            if ($scrollerTop > $distance) {
                $pl.addClass("is-fixed");
                $pl.css('width', $('.track').width());
            } else {
                $pl.removeClass("is-fixed hide").css('width','auto');
            }

            if($pl.hasClass('is-fixed hide')) {
                //union.casestudy.scrollStarted($scrollerTop, $pl);
                $pl.removeClass('hide');
            }
        },
        hideSidebar: function () {
            isScrolling = false;
            if($('.track .page-links').hasClass('is-fixed')) {
            $('.page-links').addClass('hide');
        }
        },
        showSidebar: function () {              
        var $element = $('.page-links');

        $(document).mousemove(function(e) {  
            if(union.casestudy.isClose(e, $element)) {
                if ($element.hasClass('is-fixed')) {
                    $( $element ).addClass('over');
                }
            } else {
                if ($element.hasClass('is-fixed')) {
                    $( $element ).removeClass('over');
                }
            }
        });
        },
        scrollStarted: function (startpos,el) {
            if(!isScrolling) {
                var $endpos = setTimeout(function(){
                    if((startpos - $(window).scrollTop()) > 100 || ($(window).scrollTop() - startpos) > 100) {
                        el.removeClass("is-fixed hide");
                    }
                },350);
            }
            isScrolling = true;
        },
        scrollStopped: function (callback) {
      if ($(window).data('scrollTimeout')) {
            clearTimeout($(window).data('scrollTimeout'));
      }
      $(window).data('scrollTimeout', setTimeout(callback,500,this));
        },
        resizeSidebar: function (el) {
            el.css('width', $('.track').width());
        },
        switcher: function () {
            $('.switch').on("click", function(e) {
                e.preventDefault();

                var anchor = $("[href=" + this.hash + "]");
                var div = $(this.hash);

                // activate selector
                anchor.addClass("active").siblings().removeClass("active");

                // activate content
                div.addClass("active").siblings().removeClass("active");

            });
        },
        scrollPage: function (target) {
            $("html, body").animate({"scrollTop": target.offset().top - 100}, 500);
        },
        isClose: function(e,element) {
        
            mX = e.pageX;
            mY = e.pageY;
            distance = withinArea(element, mX, mY);
            
            if (distance < 250) {
                return true;
            } else {
                return false;
            }

            function withinArea(elem,mouseX,mouseY) {
            return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
        }
      },
      pageLinkHover: function() {
        $('.page-links li').hover(
            function() {
                if( !$(this).hasClass('active') ) {
                    $(this).addClass('hover');
                }
                $(this).parent().addClass('hovering');
            }, function() {
                $(this).removeClass('hover');
                $(this).parent().removeClass('hovering');
            }
        );
      }
    }
})();
union.loading = (function() {
    var $loader = $('#loader');

    return {
        init: function(isAnimated) {
            $loader.addClass('play');
            $(window).load(function() {
                union.loading.done(isAnimated);
            });
        },
        done: function(isAnimated) {
            $loader.removeClass('play').addClass('done');
            setTimeout(function() {
                $('html').addClass('loaded');
                $('[data-top-reveal] > li, [data-top-reveal] .fade-in').each(function(i, el) {
                    var $item = $(el);
                    setTimeout(function() {
                        $item.addClass('show');
                    }, (i * (1500 / $item.siblings().andSelf().length)));
                });
            }, (isAnimated ? 1000 : 0));
        }
    }
})();
union.alert = (function() {
    return {
        init: function() {
            $('body').on('click', '[data-close]', function() {
                $('body').removeClass('has-alert');
                if($(this).parents('.alert-bar').hasClass('reminder')) {
                    union.alert.setCookie();
                }
            });
            $('body').on('click', '.alert-bar a', function() {
                if($(this).parents('.alert-bar').hasClass('reminder')) {
                    union.alert.setCookie();
                }
            });
        },
        setCookie: function() {
            $.cookie('hideAlert', 'true', { expires: 9999 });
        }
    }
})();
union.home = (function() {
    return {
        init: function() {

            // Initialize homepage stuff here

        }
    }
})();
union.video = (function() {
    var video;

    return {
        init: function() {
            $("video").each(function() {
                var $video  = $(this),
                    $parent = $video.parent(),
                    poster  = $video.attr("poster");

                // Disable for touch devices
                if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                    $video.remove();
                } else {
                    video = $video.get(0);

                    $video.find("source").each(function() {
                        var $source = $(this);
                        if (maxWidth = $source.attr("data-max-width")) {
                            if ($(window).width() <= maxWidth) {
                                $source.attr("src", $source.attr("data-src"));
                                return false;
                            }
                        } else {
                            $source.attr("src", $source.attr("data-src"));
                            $source.attr("data-src", null);
                        }
                    });

                    $video.html($video.html());

                    // Autoplay
                    if ($video.attr("autoplay")) {
                        $video.show();
                        $video.get(0).play();
                    }
                }

                // Responsive poster image
                poster && $parent.css("background-image", "url(" + poster + ")");
            });
        },
        pause: function() {
            video && video.pause();
        },
        play: function() {
            video && video.play();
        }
    }
})();
union.typed = (function() {
    return {
        init: function() {
            $("#typed").typed({
                strings: ["A Full-Service<br>Digital Agency"],
                loop: false,
                typeSpeed: 50,
                cursorChar: "",
                contentType: "html"
            });
        }
    }
})();
var $root = $('html, body');

$(document).ready(function() {
    $(document).on('click', '[data-scroll]', function(e){
        e.preventDefault();

        var target = $($.attr(this, 'href'));

        $root.animate({
            scrollTop: target.offset().top - 115
        }, 500);
    });

    if(window.location.hash) {
        requestAnimationFrame(function(){
            var target = $(window.location.hash);

            $root.animate({
                scrollTop: target.offset().top - 115
            }, 1000);

            return false;
        });
    }
})
$(document).ready(function() {
    var serviceText = $('.ServicesBlocks-text').html();

    $('.ServicesBlocks-item').mouseenter(function() {
        var hoveredValue = $(this).data('blocksValue');

        $('.ServicesBlocks-item').css('backgroundColor', '#e6e6e6');

        $(this).css('backgroundColor', '#f33951');

        $('.ServicesBlocks-text').html(hoveredValue);

    }).mouseleave(function() {
        if (window.location.pathname !== '/services') {
            $('.ServicesBlocks-text').html(serviceText);
            $('.ServicesBlocks-item').css('backgroundColor', '#e6e6e6');
            $('.ServicesBlocks-item-initial').css('backgroundColor', '#f33951');
        }
    })
})
union.hpvideo = (function() {
    var $id = $(".m_modal--video").data("video-id"),
        $bg = $("#video--bg"),
        $video = $("#video--homepage"),
        $parent = $video.parents(".video-container"),
        playBtn = $(".btn-play"),
        video = $video.get(0),
        bgVideo = $bg.get(0);
    
    return {
        init: function() {
            var timer = setTimeout(function() {
                if (!union.main.isMobile) {
                    $parent.css({"background-image":"", "background-color":"#1a1a1a"});
                }
            }, 500);
            
            playBtn.on("click", function(e){
                e.preventDefault();
                union.hpvideo.btnClick();
            });

            video.onended = function() {
                union.hpvideo.scrolled();
                bgVideo && bgVideo.play();
            }
        },
        btnClick: function() {
            if(playBtn.data("play-pause") !== "pause") {
                $video.fadeIn("fast", function(){
                    $bg.hide().data("active", false);
                }).data("active", true).css("opacity","1");
                $("body").addClass("video-is-active");
                video && video.play();
                playBtn.data("play-pause", "pause").css("opacity","0.5");
            } else {
                union.hpvideo.scrolled();
                bgVideo && bgVideo.play();
            }
            
        },
        play: function() {
            bgVideo && bgVideo.play();
        },
        scrolled: function() {
            bgVideo && bgVideo.pause();
            video && video.pause();
            if(video.readyState > 0) {
                video.currentTime = 0;
            }
            $video.fadeOut(300, function(){
                $bg.fadeIn().data("active", true);
                $(this).css("opacity","1");
            }).data("active", false);
            playBtn.css("opacity","1").data("play-pause", "play");
            $("body").removeClass("video-is-active");
        }
    }
})();


union.serviceTabsHover = (function() {
    return {
        init: function() {
        	$(document).on({
        	    mouseenter: function () {
        	        console.log('enter');
        	        $('.tabs-services a.tab-item-cell').not($(this)).addClass('inactive');
        	    },
        	    mouseleave: function () {
        	        $('.tabs-services a.inactive').removeClass('inactive');
        	    }
        	}, '.tabs-services a.tab-item-cell');
        }
    }
})();


// jquery.event.move
//
// 1.3.6
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
		    active = false,
		    running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var timer = e.data.timer;

		e.data.touch = e;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		e.data.touch = touch;
		e.data.timeStamp = e.timeStamp;
		timer.kick();
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var event, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			function update(time) {
				updateEvent(event, data.touch, data.timeStamp);
				trigger(e.target, event);
			}

			event = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: event,
				timer: new Timer(update),
				touch: undefined,
				timeStamp: undefined
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});

(function($){

  $.fn.twentytwenty = function(options) {
    var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
    return this.each(function() {

      var sliderPct = options.default_offset_pct;
      var container = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';
      
      
      container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      container.append("<div class='twentytwenty-overlay'></div>");
      var beforeImg = container.find("img:first");
      var afterImg = container.find("img:last");
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");
      slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
      slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");
      
      var overlay = container.find(".twentytwenty-overlay");
      overlay.append("<div class='twentytwenty-before-label'></div>");
      overlay.append("<div class='twentytwenty-after-label'></div>");

      var calcOffset = function(dimensionPct) {
        var w = beforeImg.width();
        var h = beforeImg.height();
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };

      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
      	  beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
      	}
      	else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
    	}
        container.css("height", offset.h);
      };

      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      }

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var imgWidth = 0;
      
      slider.on("movestart", function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = beforeImg.height();          
      });

      slider.on("moveend", function(e) {
        container.removeClass("active");
      });

      slider.on("move", function(e) {
        if (container.hasClass("active")) {
          sliderPct = (sliderOrientation === 'vertical') ? (e.pageY-offsetY)/imgHeight : (e.pageX-offsetX)/imgWidth;
          if (sliderPct < 0) {
            sliderPct = 0;
          }
          if (sliderPct > 1) {
            sliderPct = 1;
          }
          adjustSlider(sliderPct);
        }
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      $(window).trigger("resize.twentytwenty");
    });
  };

})(jQuery);

$(window).load(function(){
	$(".twentytwenty-container").twentytwenty({default_offset_pct: .64});
});
//# sourceMappingURL=app.js.map
