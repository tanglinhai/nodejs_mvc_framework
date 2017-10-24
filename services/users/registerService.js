const utils = require('../../utils/utils');
const bcrypt = require('bcrypt');
const passConfig = require('../../config/pass');
module.exports={
    register: (req,res)=>{
        return new Promise((resolve, reject) => {
            req.db.load('../../models/p2peye_fe/user', (err)=>{
                const userModel = req.db.models.user;
                const username = req.body.username.trim();
                let password = req.body.password.trim();
                const email = req.body.email.trim();
                const phone = req.body.phone.trim();
                const description = req.body.description.trim();
                let name = req.body.name.trim();
                const cname = req.body.cname.trim();
                name = name.length == 0 ? username : name;
                password = bcrypt.hashSync(username+password, bcrypt.genSaltSync(passConfig.saltRounds));
                //根据emai查找
                userModel.find({username: username, email: email}, (err, items)=>{
                    if (err) {
                        resolve(err);
                    } else {
                        if(items && items.length > 0){
                            let message = '';
                            if(items[0].username == username){
                                message = "用户名已经存在"
                            }
                            if(items[0].email == email){
                                message += message.length > 0 ? message+", 邮件已经存在" : "邮件已经存在";
                            }
                            resolve({
                                code: 200,
                                message: message,
                                data: null
                            });
                        }else{
                            userModel.create({
                                username: username,
                                password: password,
                                email: email,
                                phone: phone,
                                description: description,
                                name: name,
                                cname: cname
                            }, function(err, item) {
                                if (err) resolve({
                                    code: 200,
                                    message: "注册出错，请稍后再试！",
                                    data: null
                                });
                                resolve({
                                    code: 200,
                                    message: "",
                                    data: item
                                });
                            });
                        }
                    }
                });
            });
        });
    }
};