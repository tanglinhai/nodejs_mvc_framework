module.exports={
    login: function(req,res,callback) {
        req.db.load('../models/user', function (err) {
            var userModel = req.db.models.user;
            var username = req.body.username;
            var password = req.body.password;
            //根据emai查找
            userModel.find({username: username, password: password}, function (err, item) {
                if (err) {
                    callback && callback(err);
                } else {
                    if(item && item.length > 0){
                        callback && callback(err, {
                            code: 200,
                            message: '',
                            data: item[0]
                        });
                    }else{
                        callback && callback(null, {
                            code: 200,
                            message: '用户名或者密码不正确!',
                            data: null
                        });
                    }
                }
            });
        });
    }
};