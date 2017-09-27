const multiparty = require('multiparty');
const path = require('path');
const utils = require('../utils/utils');
const moment = require('moment');
const fs = require('fs');
const os = require('os');
const unzip = require('unzip');
const rimraf = require('rimraf');
const exec = require('child_process').exec;
const pageSize = 10;

module.exports={
    getWebsites: function(req,res,callback) {
        req.db.load('../models/website_uploads', function (err) {
            const website_uploadsModel = req.db.models.website_uploads;
            const page = req.body.page || 1;
            website_uploadsModel.count(function(e, total){
                if(e){
                    callback && callback(e);
                }else{
                    website_uploadsModel.find(pageSize, {},{
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
    getAllWorks: function(req,res,callback) {
        req.db.load('../models/website_uploads', function (err) {
            const website_uploadsModel = req.db.models.website_uploads;
            const page = req.params.page || 1;
            website_uploadsModel.count(function(e, total){
                if(e){
                    callback && callback(e);
                }else{
                    website_uploadsModel.find(10, {},{
                        offset: (page-1)*10,
                        order: ['date', 'Z']
                    }, function(err, results) {
                        callback && callback(err,{
                            page: parseInt(page),
                            total: total,
                            allWorks: results
                        });
                    });
                }
            });
        })
    },
    uploadWorks: function (req,res,callback) {
        const filepath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/websites');
        fs.existsSync(filepath) || fs.mkdirSync(filepath);
        const form = new multiparty.Form({
            uploadDir: filepath,
            maxFilesSize: 50*1024*1024
        });
        form.parse(req, function(err, fields, formBody) {
            if(err){
                if(err.statusCode == 413){
                    callback && callback({
                        code: 200,
                        message: '上传文件最大不能超出50MB！',
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
                const inputFile = formBody.file[0];
                const filename = inputFile.originalFilename;
                const subject_name = fields.subject_name;
                const subject_description = fields.subject_description;
                let filenameTarget = '';
                const splitor = os.platform() == 'win32' ? '\\' : '/';
                filenameTarget = inputFile.path.substring(inputFile.path.lastIndexOf(splitor)+1, inputFile.path.length);

                //check the file is existed.
                let sql = "SELECT * FROM website_uploads WHERE userid=? and subject_name=?";
                utils.query(sql, [req.session.user.id, subject_name], function(error,rowDataPackets, fieldPackets){
                    if(rowDataPackets && rowDataPackets.length > 0){
                        fs.unlinkSync(inputFile.path);
                        callback && callback({
                            code: 200,
                            message: '您的作品名称已经重复，请修改之！',
                            data: null
                        });
                    }else{
                        //reset extract folder
                        const extractFolderPath = filepath+'/'+subject_name;
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
                            //check index.html file is existed
                            const indexPath = extractFolderPath + '/index.html';
                            if(fs.existsSync(indexPath)){
                                //generate snapshot
                                const phantomPath = path.join(__dirname, '../utils/'+(os.platform() == 'win32' ? 'phantomjs-2.1.1-windows' : 'phantomjs-2.1.1-linux-x86_64')+'/bin')+'/phantomjs';
                                const indexUrl = 'http://127.0.0.1:3000/uploads/'+req.session.user.id+'/websites/'+subject_name+'/index.html';
                                const cmd = phantomPath+' ./utils/rasterize.js '+indexUrl+' ./public/uploads/'+req.session.user.id+'/websites/'+subject_name+'/snapshot_'+filenameTarget+'.png 531px*332px';

                                exec(cmd, function(error, stdout, stderr) {
                                    if(error){
                                        console.log(error);
                                    }else{
                                        console.log('generate snapshot complete!');
                                    }
                                });

                                //save to database.
                                sql = "INSERT INTO website_uploads (filename,filenameTarget,userid,date,subject_name,subject_description) VALUES(?,?,?,?,?,?)";
                                utils.query(sql, [filename,filenameTarget,req.session.user.id,moment().format('YYYY-MM-DD hh:mm:ss'),subject_name,subject_description], function(error,vals){
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
                            }else{
                                if(fs.existsSync(inputFile.path)){
                                    fs.unlinkSync(inputFile.path);
                                }
                                if(fs.existsSync(extractFolderPath)){
                                    rimraf.sync(extractFolderPath);
                                }
                                callback && callback({
                                    code: 200,
                                    message: 'zip包中根目录下无index.html入口文件，请重新打包作品包！',
                                    data: null
                                });
                            }
                        });
                        fs.createReadStream(inputFile.path).pipe(extract);
                    }
                });
            }
        });
    },
    delUploadWorks: function (req,res,callback) {
        req.db.load('../models/website_uploads', function (err1) {
            const website_uploadsModel = req.db.models.website_uploads;
            website_uploadsModel.find({userid: req.session.user.id, id: req.params.id}, function (err2, website_uploads) {
                if(err2){
                    callback && callback(err2);
                }else{
                    if(website_uploads && website_uploads.length > 0){
                        const filepath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/websites/'+website_uploads[0].filenameTarget);
                        if(fs.existsSync(filepath)){
                            fs.unlinkSync(filepath);
                        }
                        const extractFolderPath = path.join(__dirname, '../public/uploads/'+req.session.user.id+'/websites/'+website_uploads[0].subject_name);
                        if(fs.existsSync(extractFolderPath)){
                            rimraf.sync(extractFolderPath);
                        }
                        website_uploads[0].remove(function (err4) {
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