var express = require('express');
var router = express.Router();
var indexService = require('../services/indexService');
var utils = require('../utils/utils');

/* go to index page */
router.get("/",function(req,res,next){
    res.render('index');
});
router.get("/index.html",function(req,res,next){
    res.render('index');
});


/* get to user login page. */
router.get('/loginPage', function(req, res, next) {
    res.render('login');
});

/* GET user detail. */
router.post('/login', function(req, res, next) {
    indexService.login(req, res, function(err, result){
        if(err){
            res.render('error', err);
        }else{
            if(result.data){
                req.session.user = result.data;
                res.redirect('/');
            }else{
                res.locals.loginResult = {
                    message: result.message
                };
                res.render('login');
            }

        }
    });
});
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/');
});






module.exports = router;
