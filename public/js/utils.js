module.exports = {
    alert: (message) => {
        var errorTips = $(`<div class="alert alert-danger p2peye-fe-message" role="alert">${message}</div>`);
        $('body').append(errorTips);
        setTimeout(function(){
            errorTips.animate({
                'top': '-100px',
                'opacity': 0
            }, 1000, function(){
                errorTips.remove();
            });
        }, 2000);
    },
    getMax: (x, y) => {
        return Math.max(x,y);
    },
    getPagerDom: (data) => {
        let html = '<ul class="pagination">';

        const current_page = data.page,
            total_page = Math.ceil(data.total / 10);
        if (total_page <= 1) {
            return '';
        }
        //上一页
        //上一页 不可点击
        if (current_page <= 1) {
            html += '<li class="disabled"><a href="javascript:void(0);" aria-label="Previous"><span aria-hidden="true">«</span></a></li>';
        } else {
            //上一页可点击
            const page_prev = current_page - 1;
            html += '<li><a href="javascript:void(0);" aria-label="Previous" page="'+page_prev+'"><span aria-hidden="true">«</span></a></li>';
        }

        if(total_page <=10){
            for (let i = 1; i <= total_page; i++) {
                if (i == current_page) {
                    html += '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0)" page="'+i+'">' + i + '</a></li>';
                }
            }
        }else{

            //while currpage in ahead or behind
            if(current_page < 5 || (total_page - current_page < 5)){
                for (let i = 1; i <= 4; i++) {
                    if (i == current_page) {
                        html += '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                    } else {
                        html += '<li><a href="javascript:void(0)" page="'+i+'">' + i + '</a></li>';
                    }
                }
                html += '<li><div style="float: left;width: 34px;height: 34px;line-height: 34px;text-align: center;">...</div></li>';
                for (let i = total_page - 3; i <= total_page; i++) {
                    if (i == current_page) {
                        html += '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                    } else {
                        html += '<li><a href="javascript:void(0)" page="'+i+'">' + i + '</a></li>';
                    }
                }
            } else {//while currPage in center place
                html += '<li><a href="javascript:void(0)" page="1">1</a></li>';
                html += '<li><div style="float: left;width: 34px;height: 34px;line-height: 34px;text-align: center;">...</div></li>';

                for (let i = total_page/2 - 2; i <= total_page/2 + 2; i++) {
                    if (i == current_page) {
                        html += '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                    } else {
                        html += '<li><a href="javascript:void(0)" page="'+i+'">' + i + '</a></li>';
                    }
                }

                html += '<li><div style="float: left;width: 34px;height: 34px;line-height: 34px;text-align: center;">...</div></li>';
                html += '<li><a href="javascript:void(0)" page="'+total_page+'">'+total_page+'</a></li>';
            }
            //first page
            if (1 == current_page) {
                html += '<li class="active"><a href="javascript:void(0)">1</a></li>';
            } else {
                html += '<li><a href="javascript:void(0)" page="1">1</a></li>';
            }


            for (let i = 1; i <= total_page; i++) {
                if (i == current_page) {
                    html += '<li class="active"><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    html += '<li><a href="javascript:void(0)" page="'+i+'">' + i + '</a></li>';
                }
            }

            //last page
            if (total_page == current_page) {
                html += '<li class="active"><a href="javascript:void(0)">'+total_page+'</a></li>';
            } else {
                html += '<li><a href="javascript:void(0)" page="'+total_page+'">'+total_page+'</a></li>';
            }
        }



        //下一页
        //下一页 不可点击
        if (current_page >= total_page) {
            html += '<li class="disabled"><a href="javascript:void(0);" aria-label="Next"><span aria-hidden="true">»</span></a></li>';
        } else {
            //下一页 可点击
            const page_next = current_page + 1;
            html += '<li><a href="javascript:void(0);" aria-label="Next" page="'+page_next+'"><span aria-hidden="true">»</span></a></li>';
        }
        html += '</ul>';


        return html;
    }
};
