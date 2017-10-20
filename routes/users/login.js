const express = require('express');
const router = express.Router();
const usersService = require('../../services/users/loginService');
const utils = require('../../utils/utils');


/* get to user login page. */
router.get('/page', (req, res, next)=>{
  res.render('users/login');
});

/* GET user detail. */
router.post('/in', (req, res, next)=> {
  usersService.login(req, res).then((result) => {
    if(result.code != 200){
      res.render('error', result);
    }else{
      if(result.data){
        req.session.user = result.data;
        res.redirect('/');
      }else{
        res.locals.loginResult = {
          message: result.message
        };
        res.render('users/login');
      }

    }
  });
});
router.get('/out', (req, res, next)=> {
  req.session.user = null;
  res.redirect('/');
});




module.exports = router;
