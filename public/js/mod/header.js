
$('header .user_info').click(function(e){
    var $menu = $(this).children('ul.user_dropmenu');

    if($menu.is(':visible')){
        $menu.hide();
    }else{
        $menu.show();
    }
});

$('body').on('click', function(e){
    var t = e.target || e.srcElement,
        $t = $(t),
        $user_info = $t.closest('.user_info'),
        $userDropMenu = $t.closest('ul.user_dropmenu');
    if($user_info.length == 0 && $userDropMenu.length == 0){
        $('ul.user_dropmenu').hide();
    }
});