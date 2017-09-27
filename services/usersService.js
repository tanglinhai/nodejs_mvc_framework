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
    get:function(req,res,callback){
        req.db.load('../models/user',function(err){
            const userModel=req.db.models.user;
            userModel.get(req.params.id, function(err,item){
                callback && callback(err,item);
            });
        })
    },
    getAll: function(req,res,callback){
        req.db.load('../models/user',function(err){
            const userModel=req.db.models.user;
            userModel.find({}, function(err, results) {
                callback && callback(err,results);
            });
        })
    },
    del: function(req,res,callback){
        req.db.load('../models/user',function(err){
            const userModel=req.db.models.user;
            userModel.get(req.params.id, function (err, user) {
                /*user.save(newUser, function (err, user_item) {
                    callback.call(this, err, util.extend(req.session.user, user_item));
                });*/
                user.remove(function (err) {
                    callback && callback(err);
                });
            });
        })
    },
    addUser: function(req,res,callback) {
        req.db.load('../models/user', function (err) {
            const userModel = req.db.models.user;
            userModel.get(1, function (err, user) {
                console.log(user);
                /*user.save(newUser, function (err, user_item) {
                 callback.call(this, err, util.extend(req.session.user, user_item));
                 });*/
            });
        })
    },
    getUserInfo: function(req,res,callback) {
        const page = 1;
        req.db.load('../models/website_uploads', function (err) {
            if(err) throw err;
            const website_uploadsModel = req.db.models.website_uploads;
            website_uploadsModel.count({userid: req.session.user.id}, function(cwebsiteerr, websiteCounts) {
                if(cwebsiteerr) throw cwebsiteerr;
                website_uploadsModel.find(pageSize, {userid: req.session.user.id},{
                    offset: (page-1)*pageSize
                }, function(fwebsiteerr, websites) {
                    if(fwebsiteerr) throw fwebsiteerr;



                    req.db.load('../models/components', function (err) {
                        if(err) throw err;
                        const componentsModel = req.db.models.components;
                        componentsModel.count({userid: req.session.user.id}, function(ccomponentserr, componentsCounts) {
                            if(ccomponentserr) throw ccomponentserr;
                            componentsModel.find(pageSize, {userid: req.session.user.id},{
                                offset: (page-1)*pageSize
                            }, function(fcomponentserr, components) {
                                if(fcomponentserr) throw fcomponentserr;




                                req.db.load('../models/plugins', function (err) {
                                    if(err) throw err;
                                    const pluginsModel = req.db.models.plugins;
                                    pluginsModel.count({userid: req.session.user.id}, function(cpluginserr, pluginsCounts) {
                                        if(cpluginserr) throw cpluginserr;
                                        pluginsModel.find(pageSize, {userid: req.session.user.id},{
                                            offset: (page-1)*pageSize
                                        }, function(fpluginserr, plugins) {
                                            if(fpluginserr) throw fpluginserr;
                                            callback && callback(null,{
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