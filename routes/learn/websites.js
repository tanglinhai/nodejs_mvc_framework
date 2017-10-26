const express = require('express');
const router = express.Router();
const websitesService = require('../../services/learn/websitesService');
const utils = require('../../utils/utils');

/* go to websites page */
router.get("/(:page)?",(req,res,next)=>{
    websitesService.getAllWorks(req, res).then(params=>{
        let {err, result} = params;
        if(err){
            res.render('error', err);
        }else{
            res.render('learn/websites/index', result);
        }
    }, (err)=>{
        return next(err);
    });
});
/* get websites  */
router.post("/getWebsites",(req,res,next)=>{
    websitesService.getWebsites(req, res).then(params=>{
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
/* userCenter uploadWorks. */
router.post('/uploadWebsite/', (req, res, next)=>{
    websitesService.uploadWorks(req, res).then(params=>{
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
router.get('/delWebsite/:id', (req, res, next)=>{
    websitesService.delUploadWorks(req, res).then(params=>{
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
