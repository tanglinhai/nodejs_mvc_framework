const express = require('express');
const router = express.Router();
const pluginsService = require('../../services/learn/pluginsService');
const utils = require('../../utils/utils');

/* go to plugins page */
router.get("/(:page)?",(req,res,next)=>{
    pluginsService.getAll(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('learn/plugins/index', result);
        }
    });
});
/* get plugins  */
router.post("/getPlugins",(req,res,next)=>{
    pluginsService.getPlugins(req, res).then(params=>{
        let {err, result} = params;
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
router.get("/detail/:id",(req,res,next)=>{
    pluginsService.get(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('learn/plugins/detail', {plugin:result});
        }
    });
});

/* userCenter uploadWorks. */
router.post('/uploadPlugin/', (req, res, next)=>{
    pluginsService.upload(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});


/* userCenter uploadWorks. */
router.get('/delPlugin/:id', (req, res, next)=>{
    pluginsService.delUpload(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', err);
        }else{
            res.redirect('/users/userCenter/');
        }
    });
});

module.exports = router;
