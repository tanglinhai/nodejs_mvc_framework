const header = require('../../../../js/mod/header');
const footer = require('../../../../js/mod/footer');
const utils = require('../../../../js/utils');
const dot = require('../../../../plugins/jquery.dotdotdot.min');
const only_num_char_ = /^[a-zA-Z0-9_@]{1,}$/;
$('.multi-line').dotdotdot({wrap: 'letter'});


$('.btn_del_work').on('click', function(e){
    if(confirm('确定要删除作品吗？')){
        return true;
    }else{
        return false;
    }
});

/**
 * 分页事件
 */
$('#pluginPager').click(function(e){
    var t = e.target || e.srcElement,
        $t = $(t);
    if(t.tagName && t.tagName.toLowerCase() == 'a'){
        var page = parseInt(t.getAttribute('page'));
        if(!isNaN(page)){
            $.ajax({
                type: 'POST',
                url: '/plugins/getPlugins',
                dataType: 'json',
                data: {
                    page: page
                },
                success: function(data){
                    var targetSrc = '';
                    for(var i=0;i<data.data.length;i++){
                        var d = data.data[i];
                        targetSrc += '<tr>'+
                            '<th>'+(i+1)+'</th>'+
                            '<td>'+d.title+'</td>'+
                            '<td>'+d.ctitle+'</td>'+
                            '<td><div class="multi-line">'+d.code+'</div></td>'+
                            '<td><div class="multi-line">'+d.description+'</div></td>'+
                            '<td>'+d.date+'</td>'+
                            '<td><a class="btn_del_work" href="/plugins/delPlugin/'+d.id+'">删除</a></td>'+
                            '</tr>';
                    }
                    $('.pluginTable tbody').html(targetSrc).find('.multi-line').dotdotdot({wrap: 'letter'});
                    $('#pluginPager').html(utils.getPagerDom(data));
                },
                error: function(){
                    alert('请求服务错误！');
                }
            });
        }
    }
});
$('#componentPager').click(function(e){
    var t = e.target || e.srcElement,
        $t = $(t);
    if(t.tagName && t.tagName.toLowerCase() == 'a'){
        var page = parseInt(t.getAttribute('page'));
        if(!isNaN(page)){
            $.ajax({
                type: 'POST',
                url: '/components/getComponents',
                dataType: 'json',
                data: {
                    page: page
                },
                success: function(data){
                    var targetSrc = '';
                    for(var i=0;i<data.data.length;i++){
                        var d = data.data[i];
                        targetSrc += '<tr>'+
                            '<th>'+(i+1)+'</th>'+
                            '<td>'+d.title+'</td>'+
                            '<td>'+d.ctitle+'</td>'+
                            '<td><div class="multi-line">'+d.code+'</div></td>'+
                            '<td><div class="multi-line">'+d.description+'</div></td>'+
                            '<td>'+d.date+'</td>'+
                            '<td><a class="btn_del_work" href="/components/delComponent/'+d.id+'">删除</a></td>'+
                            '</tr>';
                    }
                    $('.componentTable tbody').html(targetSrc).find('.multi-line').dotdotdot({wrap: 'letter'});
                    $('#componentPager').html(utils.getPagerDom(data));
                },
                error: function(){
                    alert('请求服务错误！');
                }
            });
        }
    }
});
$('#websitePager').click(function(e){
    var t = e.target || e.srcElement,
        $t = $(t);
    if(t.tagName && t.tagName.toLowerCase() == 'a'){
        var page = parseInt(t.getAttribute('page'));
        if(!isNaN(page)){
            $.ajax({
                type: 'POST',
                url: '/websites/getWebsites',
                dataType: 'json',
                data: {
                    page: page
                },
                success: function(data){
                    var targetSrc = '';
                    for(var i=0;i<data.data.length;i++){
                        var d = data.data[i];
                        targetSrc += '<tr>'+
                            '<th>'+(i+1)+'</th>'+
                            '<td><a href="/uploads/'+d.userid+'/websites/'+d.subject_name+'/index.html">'+d.filename+'</td>'+
                            '<td>'+d.subject_name+'</td>'+
                            '<td><div class="multi-line">'+d.subject_description+'</div></td>'+
                            '<td>'+d.date+'</td>'+
                            '<td><a class="btn_del_work" href="/websites/delWebsite/'+d.id+'">删除</a></td>'+
                            '</tr>';
                    }
                    $('.websiteTable tbody').html(targetSrc).find('.multi-line').dotdotdot({wrap: 'letter'});
                    $('#websitePager').html(utils.getPagerDom(data));
                },
                error: function(){
                    alert('请求服务错误！');
                }
            });
        }
    }
});


/**
 * 上传提交表单检查拦截
 */
$('#form_uploadWebsite').on('submit', function(e){
    var subject_name = $('#subject_name').val(),
        subject_description = $.trim($('#subject_description').val()),
        filename = $('#file').val();
    if(subject_name.length == 0){
        alert('请填写作品名称!');
        return false;
    }
    if(!subject_name.match(only_num_char_)){
        alert('作品名称只允许输入数字，字母，下划线，@号!');
        return false;
    }
    if(subject_description.length == 0){
        alert('请描述作品!');
        return false;
    }
    if(filename.length == 0){
        alert('请选择作品文件!');
        return false;
    }
    var subfix = filename.lastIndexOf('.') == -1 ? '' : filename.substring(filename.lastIndexOf('.')+1, filename.length).toLowerCase();

    if(subfix != 'zip'){
        alert('上传文件的格式必须是zip!');
        return false;
    }
    return true;
});
$('#form_uploadComponent').on('submit', function(e){
    var title = $('#components_title').val(),
        ctitle = $.trim($('#components_ctitle').val()),
        description = $.trim($('#components_description').val()),
        code = $.trim($('#components_code').val()),
        file = $('#components_file').val();
    if(title.length == 0){
        alert('请填写组件英文名称!');
        return false;
    }
    if(!title.match(only_num_char_)){
        alert('组件英文名称只允许输入数字，字母，下划线，@号!');
        return false;
    }
    if(ctitle.length == 0){
        alert('请填写组件中文名称!');
        return false;
    }
    if(description.length == 0){
        alert('请描述组件!');
        return false;
    }
    if(code.length == 0){
        alert('请输入组件html代码!');
        return false;
    }
    if(file && file.length > 0){
        var subfix = file.lastIndexOf('.') == -1 ? '' : file.substring(file.lastIndexOf('.')+1, file.length).toLowerCase();

        if(subfix != 'zip'){
            alert('上传文件的格式必须是zip!');
            return false;
        }
    }

    return true;
});
$('#form_uploadPlugin').on('submit', function(e){
    var title = $('#plugins_title').val(),
        ctitle = $.trim($('#plugins_ctitle').val()),
        description = $.trim($('#plugins_description').val()),
        code = $.trim($('#plugins_code').val()),
        file = $('#plugins_file').val();
    if(title.length == 0){
        alert('请填写插件英文名称!');
        return false;
    }
    if(!title.match(only_num_char_)){
        alert('插件英文名称只允许输入数字，字母，下划线，@号!');
        return false;
    }
    if(ctitle.length == 0){
        alert('请填写插件中文名称!');
        return false;
    }
    if(description.length == 0){
        alert('请描述插件!');
        return false;
    }
    if(code.length == 0){
        alert('请输入插件html代码!');
        return false;
    }
    if(file && file.length > 0){
        var subfix = file.lastIndexOf('.') == -1 ? '' : file.substring(file.lastIndexOf('.')+1, file.length).toLowerCase();

        if(subfix != 'zip'){
            alert('上传文件的格式必须是zip!');
            return false;
        }
    }

    return true;
});