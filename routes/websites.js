var express = require('express');
var router = express.Router();
var websitesService = require('../services/websitesService');
var utils = require('../utils/utils');

/* go to websites page */
router.get("/(:page)?",function(req,res,next){
    websitesService.getAllWorks(req, res, function(err, result){
        if(err){
            res.render('error', err);
        }else{
            res.render('websites/index', result);
        }
    });
});
/* get websites  */
router.post("/getWebsites",function(req,res,next){
    websitesService.getWebsites(req, res, function(err, result){
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
/* userCenter uploadWorks. */
router.post('/uploadWebsite/', function(req, res, next) {
    websitesService.uploadWorks(req, res, function(err, result){
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


/* userCenter uploadWorks. */
router.get('/delWebsite/:id', function(req, res, next) {
    websitesService.delUploadWorks(req, res, function(err, result){
        if(err){
            res.render('error', err);
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


module.exports = router;
