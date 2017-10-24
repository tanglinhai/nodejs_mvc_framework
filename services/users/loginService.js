const bcrypt = require('bcrypt');
const passConfig = require('../../config/pass');
module.exports={
    login: (req,res)=>{
        return new Promise((resolve, reject) => {
            req.db.load('../../models/p2peye_fe/user', (err)=>{
                const userModel = req.db.models.user;
                const username = req.body.username.trim();
                let password = req.body.password.trim();
                //根据emai查找
                userModel.find({username: username}, (err, item)=>{
                    if (err) {
                        resolve(err);
                    } else {
                        if(item && item.length > 0){
                            var checkPassFlag = bcrypt.compareSync(username+password, item[0].password);
                            if(checkPassFlag){
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
                        }else{
                            resolve({
                                code: 200,
                                message: '找不到该用户!',
                                data: null
                            });
                        }
                    }
                });
            });
        });
    }
};