const multiparty = require('multiparty');
const path = require('path');
const utils = require('../utils/utils');
const moment = require('moment');
const fs = require('fs');
const os = require('os');
const unzip = require('unzip');
const rimraf = require('rimraf');
const pageSize = 10;

module.exports={
    get: function(req,res,callback) {
        req.db.load('../models/components', function (err) {
            const componentsModel = req.db.models.components;
            componentsModel.find({id: req.params.id}, function(err, component) {
                if(err){
                    callback && callback(err);
                }else{
                    if(component && component.length > 0){
                        callback && callback(null,{
                            component: component[0]
                        });
                    }else{
                        callback && callback({
                            message: '没有获取到数据，请重试!',
                            code: 200,
                            data: null
                        });
                    }
                }

            });
        })
    },


    getComponents: function(req,res,callback) {
        req.db.load('../models/components', function (err) {
            const componentsModel = req.db.models.components;
            const page = req.body.page || 1;
            componentsModel.count(function(e, total){
                if(e){
                    callback && callback(e);
                }else{
                    componentsModel.find(pageSize, {},{
                        offset: (page-1)*pageSize
                    }, function(err, results) {
                        if(results){
                            for(let i=0;i<results.length;i++){
                                results[i].code = utils.html_encode(results[i].code.toString());
                            }
                        }
                        callback && callback(err,{
                            page: parseInt(page),
                            total: total,
                            data: results
                        });
                    });
                }
            });
        })
    },
    getAll: function(req,res,callback) {
        req.db.load('../models/components', function (err) {
            const componentsModel = req.db.models.components;
            const page = req.params.page || 1;
            componentsModel.count(function(e, total){
                if(e){
                    callback && callback(e);
                }else{
                    componentsModel.find(pageSize, {},{
                        offset: (page-1)*pageSize,
                        order: ['date', 'Z']
                    }, function(err, results) {
                        callback && callback(err,{
                            page: parseInt(page),
                            total: total,
                            data: results
                        });
                    });
                }
            });
        })
    },
    upload: function (req,res,callback) {
        const filepath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/components');
        fs.existsSync(filepath) || fs.mkdirSync(filepath);
        const form = new multiparty.Form({
            uploadDir: filepath,
            maxFilesSize: 20*1024*1024
        });
        form.parse(req, function(err, fields, formBody) {
            if(err){
                if(err.statusCode == 413){
                    callback && callback({
                        code: 200,
                        message: '上传文件最大不能超出20MB！',
                        data: null
                    });
                }else{
                    callback && callback(err);
                }
            }else{
                /**
                 * { file:
   [ { fieldName: 'file',
       originalFilename: '员工绩效考核_汤林海.xlsx',
       path: 'C:\\tanglinhai\\repos\\p2peye_fe\\public\\uploads\\80d1tvmcUmWO-SvWGxQNdpJr.xlsx',
       headers: [Object],
       size: 11560 } ] }
                 */
                //如果用户上传了文件
                const ctitle = fields.components_ctitle;
                const title = fields.components_title;
                const description = fields.components_description;
                const code = fields.components_code;
                //check the file is existed.
                let sql = "SELECT * FROM components WHERE userid=? and title=?";
                utils.query(sql, [req.session.user.id, title], function(error,rowDataPackets, fieldPackets){
                    if(rowDataPackets && rowDataPackets.length > 0){
                        if(formBody.components_file[0].size > 0) {
                            const inputFile = formBody.components_file[0];
                            fs.unlinkSync(inputFile.path);
                        }
                        callback && callback({
                            code: 200,
                            message: '您的组件英文名称已经重复，请修改之！',
                            data: null
                        });
                    }else{
                        if(formBody.components_file[0].size > 0) {
                            const inputFile = formBody.components_file[0];
                            const filename = inputFile.originalFilename;
                            let filenameTarget = '';
                            const splitor = os.platform() == 'win32' ? '\\' : '/';
                            filenameTarget = inputFile.path.substring(inputFile.path.lastIndexOf(splitor)+1, inputFile.path.length);
                            //reset extract folder
                            const extractFolderPath = filepath+'/'+title;
                            if(fs.existsSync(extractFolderPath)){
                                rimraf.sync(extractFolderPath);
                            }
                            fs.mkdirSync(extractFolderPath);
                            //extract files from zip.
                            const extract = unzip.Extract({ path:  extractFolderPath });
                            extract.on('error', function(err) {
                                if(fs.existsSync(inputFile.path))
                                    fs.unlinkSync(inputFile.path);
                                callback && callback({
                                    code: 200,
                                    message: '上传的文件已经损坏，请重新压缩文件确保文件完好并上传！',
                                    data: null
                                });
                            });
                            extract.on('close', function() {
                                //save to database.
                                sql = "INSERT INTO components (title,ctitle,description,code,userid,date,filenameTarget) VALUES(?,?,?,?,?,?,?)";
                                utils.query(sql, [title,ctitle,description,code,req.session.user.id,moment().format('YYYY-MM-DD hh:mm:ss'),filenameTarget], function(error,vals){
                                    /**
                                     * OkPacket {
                                      fieldCount: 0,
                                      affectedRows: 1,
                                      insertId: 7,
                                      serverStatus: 2,
                                      warningCount: 1,
                                      message: '',
                                      protocol41: true,
                                      changedRows: 0 }
                                     */
                                    callback && callback(error, vals);
                                });
                            });
                            fs.createReadStream(inputFile.path).pipe(extract);
                        }else{

                            //del cache file
                            if(fs.existsSync(formBody.components_file[0].path))
                                fs.unlinkSync(formBody.components_file[0].path);
                            //save to database.
                            sql = "INSERT INTO components (title,ctitle,description,code,userid,date,filenameTarget) VALUES(?,?,?,?,?,?,?)";
                            utils.query(sql, [title,ctitle,description,code,req.session.user.id,moment().format('YYYY-MM-DD hh:mm:ss'),null], function(error,vals){
                                /**
                                 * OkPacket {
                                      fieldCount: 0,
                                      affectedRows: 1,
                                      insertId: 7,
                                      serverStatus: 2,
                                      warningCount: 1,
                                      message: '',
                                      protocol41: true,
                                      changedRows: 0 }
                                 */
                                callback && callback(error, vals);
                            });
                        }

                    }
                });
            }
        });
    },
    delUpload: function (req,res,callback) {
        req.db.load('../models/components', function (err1) {
            const componentsModel = req.db.models.components;
            componentsModel.find({userid: req.session.user.id, id: req.params.id}, function (err2, components) {
                if(err2){
                    callback && callback(err2);
                }else{
                    if(components && components.length > 0){
                        const filepath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/components/'+components[0].filenameTarget);
                        if(fs.existsSync(filepath)){
                            fs.unlinkSync(filepath);
                        }
                        const extractFolderPath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/components/'+components[0].title);
                        if(fs.existsSync(extractFolderPath)){
                            rimraf.sync(extractFolderPath);
                        }
                        components[0].remove(function (err4) {
                            callback && callback(err4);
                        });
                    }else{
                        callback && callback({
                            code: 200,
                            message: '不好意思，你没有权限这么干！',
                            data: null
                        });
                    }
                }
            });
        })
    }
};