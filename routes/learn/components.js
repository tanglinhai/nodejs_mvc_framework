const express = require('express');
const router = express.Router();
const componentsService = require('../../services/learn/componentsService');
const utils = require('../../utils/utils');

/* go to components page */
router.get("/(:page)?",(req,res,next)=>{
    componentsService.getAll(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('learn/components/index', result);
        }
    }, (err)=>{
        return next(err);
    });
});

/* get components  */
router.post("/getComponents",(req,res,next)=>{
    componentsService.getComponents(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.json({
                code: 500,
                message: '获取数据出错：'+JSON.stringify(err)
            });
        }else{
            res.json(result);
        }
    }, (err)=>{
        return next(err);
    });
});

/* go to component detail page */
router.get("/detail/:id",(req,res,next)=>{
    componentsService.get(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.render('learn/components/detail', {component:result});
        }
    }, (err)=>{
        return next(err);
    });
});

/* userCenter uploadWorks. */
router.post('/uploadComponent/', (req, res, next)=>{
    componentsService.upload(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', {error: err.code == 200 ? err.message: JSON.stringify(err)});
        }else{
            res.redirect('/users/userCenter/');
        }
    }, (err)=>{
        return next(err);
    });
});


/* userCenter uploadWorks. */
router.get('/delComponent/:id', (req, res, next)=>{
    componentsService.delUpload(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', err);
        }else{
            res.redirect('/users/userCenter/');
        }
    }, (err)=>{
        return next(err);
    });
});


module.exports = router;
