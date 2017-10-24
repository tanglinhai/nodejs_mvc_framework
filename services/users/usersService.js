const multiparty = require('multiparty');
const path = require('path');
const utils = require('../../utils/utils');
const moment = require('moment');
const fs = require('fs');
const os = require('os');
const unzip = require('unzip');
const rimraf = require('rimraf');
const exec = require('child_process').exec;
const pageSize = 10;

module.exports={
    get:(req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/user',(err)=>{
                const userModel=req.db.models.user;
                userModel.get(req.params.id, (err,item)=>{
                    resolve({err,item});
                });
            })
        });
    },
    getAll: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/user',(err)=>{
                const userModel=req.db.models.user;
                userModel.find({}, (err, items)=>{
                    resolve({err, items});
                });
            });
        });
    },
    del: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/user',(err)=>{
                const userModel=req.db.models.user;
                userModel.get(req.params.id, (err, user)=>{
                    user.remove((err)=>{
                        resolve(err);
                    });
                });
            });
        });
    },
    addUser: (req,res)=>{
        return new Promise((resolve, reject)=>{
            req.db.load('../../models/p2peye_fe/user', (err)=>{
                const userModel = req.db.models.user;
                userModel.get(1, (err, user)=>{
                    resolve({err, user});
                    /*user.save(newUser, (err, user_item)=>{
                     callback.call(this, err, util.extend(req.session.user, user_item));
                     });*/
                });
            })
        });
    },
    getUserInfo: (req,res)=>{
        return new Promise((resolve, reject)=>{
            const page = 1;
            req.db.load('../../models/p2peye_fe/website_uploads', (err)=>{
                if(err) throw err;
                const website_uploadsModel = req.db.models.website_uploads;
                website_uploadsModel.count({userid: req.session.user.id}, (cwebsiteerr, websiteCounts)=>{
                    if(cwebsiteerr) throw cwebsiteerr;
                    website_uploadsModel.find(pageSize, {userid: req.session.user.id},{
                        offset: (page-1)*pageSize
                    }, (fwebsiteerr, websites)=>{
                        if(fwebsiteerr) throw fwebsiteerr;



                        req.db.load('../../models/p2peye_fe/components', (err)=>{
                            if(err) throw err;
                            const componentsModel = req.db.models.components;
                            componentsModel.count({userid: req.session.user.id}, (ccomponentserr, componentsCounts)=>{
                                if(ccomponentserr) throw ccomponentserr;
                                componentsModel.find(pageSize, {userid: req.session.user.id},{
                                    offset: (page-1)*pageSize
                                }, (fcomponentserr, components)=>{
                                    if(fcomponentserr) throw fcomponentserr;




                                    req.db.load('../../models/p2peye_fe/plugins', (err)=>{
                                        if(err) throw err;
                                        const pluginsModel = req.db.models.plugins;
                                        pluginsModel.count({userid: req.session.user.id}, (cpluginserr, pluginsCounts)=>{
                                            if(cpluginserr) throw cpluginserr;
                                            pluginsModel.find(pageSize, {userid: req.session.user.id},{
                                                offset: (page-1)*pageSize
                                            }, (fpluginserr, plugins)=>{
                                                if(fpluginserr) throw fpluginserr;
                                                resolve({
                                                    err: err,
                                                    result: {
                                                        components: {
                                                            page: 1,
                                                            total: componentsCounts,
                                                            data: components
                                                        },
                                                        jsplugins: {
                                                            page: 1,
                                                            total: pluginsCounts,
                                                            data: plugins
                                                        },
                                                        websites: {
                                                            page: 1,
                                                            total: websiteCounts,
                                                            data: websites
                                                        }
                                                    }
                                                });
                                            });
                                        });
                                    });



                                });
                            });
                        });



                    });
                });
            });
        });
    }
};