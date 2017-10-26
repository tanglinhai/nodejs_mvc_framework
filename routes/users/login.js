const express = require('express');
const router = express.Router();
const usersService = require('../../services/users/loginService');
const utils = require('../../utils/utils');


/* get to user login page. */
router.get('/page', (req, res, next)=>{
  res.render('users/login', {referer: req.headers.referer});
});

/* GET user detail. */
router.post('/in', (req, res, next)=> {
  usersService.login(req, res).then((result) => {
    if(result.code != 200){
      res.render('error', result);
    }else{
      if(result.data){
        req.session.user = result.data;
        let old_url = req.body.oldreferer;
        if(old_url.indexOf('login/page') > -1 || old_url.indexOf('register/page') > -1){
          old_url = '/';
        }
        res.redirect(old_url);
      }else{
        res.locals.loginResult = {
          message: result.message
        };
        res.render('users/login');
      }

    }
  }, (err)=>{
    return next(err);
  });
});
router.get('/out', (req, res, next)=> {
  req.session.user = null;
  var old_url = req.headers.referer;
  if(old_url.indexOf('login/page') > -1 || old_url.indexOf('register/page') > -1){
    old_url = '/';
  }
  res.redirect(old_url);
});




module.exports = router;
