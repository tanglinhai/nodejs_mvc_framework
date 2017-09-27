var express = require('express');
var router = express.Router();
var componentsService = require('../services/componentsService');
var utils = require('../utils/utils');

/* go to components page */
router.get("/(:page)?",function(req,res,next){
    componentsService.getAll(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('components/index', result);
        }
    });
});

/* get components  */
router.post("/getComponents",function(req,res,next){
    componentsService.getComponents(req, res, function(err, result){
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

/* go to component detail page */
router.get("/detail/:id",function(req,res,next){
    componentsService.get(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('components/detail', result);
        }
    });
});

/* userCenter uploadWorks. */
router.post('/uploadComponent/', function(req, res, next) {
    componentsService.upload(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


/* userCenter uploadWorks. */
router.get('/delComponent/:id', function(req, res, next) {
    componentsService.delUpload(req, res, function(err, result){
        if(err){
            res.render('error', err);
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


module.exports = router;
