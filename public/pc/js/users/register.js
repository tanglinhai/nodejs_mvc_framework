var backstretch = require('../../../plugins/jquery.backstretch.min');
var utils = require('../../../js/utils');
/*
 Fullscreen background
 */
$.backstretch("assets/img/backgrounds/1.jpg");

var errorTips = $('.alert-danger');
if(errorTips.length > 0){
    setTimeout(function(){
        errorTips.animate({
            'top': '-100px',
            'opacity': 0
        }, 1000, function(){
            errorTips.remove();
        });
    }, 2000);
}

/*
 Form validation
 */
$('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    $(this).removeClass('input-error');
});
$('.register-form').submit(function(e) {
    var username_dom = $('#form-username');
    var password_dom = $('#form-password');
    var password_confirm_dom = $('#form-password-confirm');
    var form_email_dom = $('#form-email');
    var form_phone_dom = $('#form-phone');
    var introduction_dom = $('#form-introduction');
    var name_dom = $('#form-name');
    var cname_dom = $('#form-cname');
    
    var username = $.trim(username_dom.val());
    var password = $.trim(password_dom.val());
    var password_confirm = $.trim(password_confirm_dom.val());
    var email = $.trim(form_email_dom.val());
    var phone = $.trim(form_phone_dom.val());
    var introduction = $.trim(introduction_dom.val());
    var name = $.trim(name_dom.val());
    var cname = $.trim(cname_dom.val());

    var flag = true, message = "";
    if(username.length == 0){
        message += "未填写用户名";
        flag = false;
        username_dom.addClass('input-error');
    }else if(!/^[a-zA-Z0-9_-]{4,30}$/.test(username)){
        message += "用户名规则：4到30位（字母，数字，下划线，减号）";
        flag = false;
        username_dom.addClass('input-error');
    }else{
        username_dom.removeClass('input-error');
    }

    if(password.length == 0){
        message += (message.length > 0 ? '、':'')+"未填写密码";
        flag = false;
        password_dom.addClass('input-error');
    }else if(!/^[A-Za-z0-9]{6,20}$/.test(password)){
        message += (message.length > 0 ? '、':'')+"6-20位字母数字组合";
        flag = false;
        password_dom.addClass('input-error');
    }else{
        password_dom.removeClass('input-error');
    }

    if(password_confirm.length == 0){
        message += (message.length > 0 ? '、':'')+"未填写确认密码";
        flag = false;
        password_confirm_dom.addClass('input-error');
    }else if(password != password_confirm){
        message += (message.length > 0 ? '、':'')+"密码及确认密码不一致";
        flag = false;
        password_confirm_dom.addClass('input-error');
    }else{
        password_confirm_dom.removeClass('input-error');
    }

    if(email.length == 0){
        message += (message.length > 0 ? '、':'')+"未填写邮件";
        flag = false;
        form_email_dom.addClass('input-error');
    }else if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)){
        message += (message.length > 0 ? '、':'')+"邮件格式错误";
        flag = false;
        form_email_dom.addClass('input-error');
    }else{
        form_email_dom.removeClass('input-error');
    }

    if(phone.length > 0 && !/^1[0-9]{10}$/.test(phone)){
        message += (message.length > 0 ? '、':'')+"手机格式错误";
        flag = false;
        form_phone_dom.addClass('input-error');
    }else{
        form_phone_dom.removeClass('input-error');
    }

    if(introduction.length > 2000){
        message += (message.length > 0 ? '、':'')+"个人介绍字数不能超出2000";
        flag = false;
        introduction_dom.addClass('input-error');
    }else{
        introduction_dom.removeClass('input-error');
    }
    if(name.length > 20){
        message += (message.length > 0 ? '、':'')+"英文名字数不能超出20";
        flag = false;
        name_dom.addClass('input-error');
    }else{
        name_dom.removeClass('input-error');
    }
    if(cname.length > 20){
        message += (message.length > 0 ? '、':'')+"中文名字数不能超出20";
        flag = false;
        cname_dom.addClass('input-error');
    }else{
        cname_dom.removeClass('input-error');
    }
    if(!flag)
        utils.alert(message);
    alert(flag);
    return flag;
});
