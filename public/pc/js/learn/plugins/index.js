var header = require('../../../../js/mod/header');
var footer = require('../../../../js/mod/footer');


var sidebar = $('nav.bs-docs-sidebar'),
    sidebarH_ = sidebar.outerHeight(),
    diffSize = 0,
    $foot = $('#ft');
function modSidesFixed(){
    var footTop = $foot.offset().top;
    var modSidesTop = sidebar.parent().offset().top;
    var winTop = $(window).scrollTop();
    if(footTop - winTop <= sidebarH_){
        sidebar.removeClass('affix').addClass('affix-bottom');
    }else if(winTop >= modSidesTop  && !sidebar.hasClass('affix')){
        sidebar.removeClass('affix-bottom').addClass('affix');
    }else if(winTop < modSidesTop && sidebar.hasClass('affix')){
        sidebar.removeClass('affix affix-bottom');
    }
}
modSidesFixed();
$(window,document).scroll(function(){
    modSidesFixed();
});

$("textarea.plugin-code").each(function(){
    var maxHeight = this.scrollHeight > 500 ? 500 : this.scrollHeight;
    $(this).height(maxHeight);
});