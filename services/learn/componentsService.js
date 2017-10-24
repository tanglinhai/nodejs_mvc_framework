const multiparty = require('multiparty');
const path = require('path');
const utils = require('../../utils/utils');
const moment = require('moment');
const fs = require('fs');
const os = require('os');
const unzip = require('unzip');
const rimraf = require('rimraf');
const pageSize = 10;

module.exports={
    get: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/components', (err)=>{
                const componentsModel = req.db.models.components;
                componentsModel.find({id: req.params.id}, (err, component)=>{
                    if(err){
                        resolve({err,result:null});
                    }else{
                        if(component && component.length > 0){
                            resolve({err,result:component[0]});
                        }else{
                            resolve({err:{
                                message: '没有获取到数据，请重试!',
                                code: 200,
                                data: null
                            },result:null});
                        }
                    }
                });
            });
        });
    },


    getComponents: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/components', (err)=>{
                const componentsModel = req.db.models.components;
                const page = req.body.page || 1;
                componentsModel.count((e, total)=>{
                    if(e){
                        resolve({err:e,result:null});
                    }else{
                        componentsModel.find(pageSize, {},{
                            offset: (page-1)*pageSize
                        }, (err, results)=>{
                            if(results){
                                for(let i=0;i<results.length;i++){
                                    results[i].code = utils.html_encode(results[i].code.toString());
                                }
                            }
                            resolve({err,result:{
                                page: parseInt(page),
                                total: total,
                                data: results
                            }});
                        });
                    }
                });
            });
        });
    },
    getAll: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/components', (err)=>{
                const componentsModel = req.db.models.components;
                const page = req.params.page || 1;
                componentsModel.count((e, total)=>{
                    if(e){
                        resolve({err:e,result:null});
                    }else{
                        componentsModel.find(pageSize, {},{
                            offset: (page-1)*pageSize,
                            order: ['date', 'Z']
                        }, (err, results)=>{
                            resolve({err,result:{
                                page: parseInt(page),
                                total: total,
                                data: results
                            }});
                        });
                    }
                });
            });
        });
    },
    upload: (req,res)=>{
        return new Promise((resolve, reject)=>{
            const filepath = path.join(__dirname, '../../public/uploads/'+req.session.user.id+'/components');
            fs.existsSync(filepath) || fs.mkdirSync(filepath);
            const form = new multiparty.Form({
                uploadDir: filepath,
                maxFilesSize: 20*1024*1024
            });
            form.parse(req, (err, fields, formBody)=>{
                if(err){
                    if(err.statusCode == 413){
                        resolve({err:{
                            code: 200,
                            message: '上传文件最大不能超出20MB！',
                            data: null
                        },result:null});
                    }else{
                        resolve({err,result:null});
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
                    utils.query(sql, [req.session.user.id, title], (error,rowDataPackets, fieldPackets)=>{
                        if(rowDataPackets && rowDataPackets.length > 0){
                            if(formBody.components_file[0].size > 0) {
                                const inputFile = formBody.components_file[0];
                                fs.unlinkSync(inputFile.path);
                            }
                            resolve({err:{
                                code: 200,
                                message: '您的组件英文名称已经重复，请修改之！',
                                data: null
                            },result:null});
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
                                extract.on('error', (err)=>{
                                    if(fs.existsSync(inputFile.path))
                                        fs.unlinkSync(inputFile.path);
                                    resolve({err:{
                                        code: 200,
                                        message: '上传的文件已经损坏，请重新压缩文件确保文件完好并上传！',
                                        data: null
                                    },result:null});
                                });
                                extract.on('close', ()=>{
                                    //save to database.
                                    sql = "INSERT INTO components (title,ctitle,description,code,userid,date,filenameTarget) VALUES(?,?,?,?,?,?,?)";
                                    utils.query(sql, [title,ctitle,description,code,req.session.user.id,moment().format('YYYY-MM-DD hh:mm:ss'),filenameTarget], (error,vals)=>{
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
                                        resolve({err:error,result:vals});
                                    });
                                });
                                fs.createReadStream(inputFile.path).pipe(extract);
                            }else{

                                //del cache file
                                if(fs.existsSync(formBody.components_file[0].path))
                                    fs.unlinkSync(formBody.components_file[0].path);
                                //save to database.
                                sql = "INSERT INTO components (title,ctitle,description,code,userid,date,filenameTarget) VALUES(?,?,?,?,?,?,?)";
                                utils.query(sql, [title,ctitle,description,code,req.session.user.id,moment().format('YYYY-MM-DD hh:mm:ss'),null], (error,vals)=>{
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
                                    resolve({err:error,result:vals});
                                });
                            }

                        }
                    });
                }
            });
        });
    },
    delUpload: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/components', (err1)=>{
                const componentsModel = req.db.models.components;
                componentsModel.find({userid: req.session.user.id, id: req.params.id}, (err2, components)=>{
                    if(err2){
                        resolve({err:err2,result:null});
                    }else{
                        if(components && components.length > 0){
                            const filepath = path.join(__dirname, '../../public/uploads/'+req.session.user.id+'/components/'+components[0].filenameTarget);
                            if(fs.existsSync(filepath)){
                                fs.unlinkSync(filepath);
                            }
                            const extractFolderPath = path.join(__dirname, '../../public/uploads/'+req.session.user.id+'/components/'+components[0].title);
                            if(fs.existsSync(extractFolderPath)){
                                rimraf.sync(extractFolderPath);
                            }
                            components[0].remove((err4)=>{
                                resolve({err:err4,result:null});
                            });
                        }else{
                            resolve({err:{
                                code: 200,
                                message: '不好意思，你没有权限这么干！',
                                data: null
                            },result:null});
                        }
                    }
                });
            });
        });
    }
};