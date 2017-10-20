module.exports={
    login: (req,res)=>{
        return new Promise((resolve, reject) => {
            req.db.load('../../models/user', (err)=>{
                const userModel = req.db.models.user;
                const username = req.body.username;
                const password = req.body.password;
                //根据emai查找
                userModel.find({username: username, password: password}, (err, item)=>{
                    if (err) {
                        resolve(err);
                    } else {
                        if(item && item.length > 0){
                            resolve({
                                code: 200,
                                message: '',
                                data: item[0]
                            });
                        }else{
                            resolve({
                                code: 200,
                                message: '用户名或者密码不正确!',
                                data: null
                            });
                        }
                    }
                });
            });
        });
    }
};