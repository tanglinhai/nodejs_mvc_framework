var express = require('express');
var router = express.Router();
var pluginsService = require('../services/pluginsService');
var utils = require('../utils/utils');

/* go to plugins page */
router.get("/(:page)?",function(req,res,next){
    pluginsService.getAll(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('plugins/index', result);
        }
    });
});
/* get plugins  */
router.post("/getPlugins",function(req,res,next){
    pluginsService.getPlugins(req, res, function(err, result){
        if(err){
            res.json({
                code: 500,
                message: '获取数据出错：'+JSON.stringify(err)
            });
        }else{
            res.json(result);
        }
    });
});
/* go to plugin detail page */
router.get("/detail/:id",function(req,res,next){
    pluginsService.get(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('plugins/detail', result);
        }
    });
});

/* userCenter uploadWorks. */
router.post('/uploadPlugin/', function(req, res, next) {
    pluginsService.upload(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


/* userCenter uploadWorks. */
router.get('/delPlugin/:id', function(req, res, next) {
    pluginsService.delUpload(req, res, function(err, result){
        if(err){
            res.render('error', err);
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});

module.exports = router;
