const express = require('express');
const router = express.Router();
const usersService = require('../../services/users/usersService');
const websitesService = require('../../services/learn/websitesService');
const utils = require('../../utils/utils');


/* check is logined */
router.all("*",(req,res,next)=>{

  var session=req.session;
  if(!session.user){//no login
    res.redirect('/loginPage');
  }else{
    next();
  }
});



/* GET users listing. */
router.get('/', (req, res, next)=>{
  usersService.getAll(req, res).then(params=>{
    let {err, items} = params;
    if(err){
      res.render('error', err);
    }else{
      res.render('users/list', {users: items});
    }
  });
});

/* GET user detail. */
router.get('/getUser/:id', (req, res, next)=>{
  usersService.get(req, res).then(params=>{
    let {err, item} = params;
    if(err){
      res.render('error', err);
    }else{
      res.render('users/info', {user: item});
    }
  });
});


/* delete user. */
router.get('/delete/:id', (req, res, next)=>{
  usersService.del(req, res).then(err=>{
    if(err){
      res.render('error', err);
    }else{
      res.redirect('/users');
    }
  });
});

/* go to add user page. */
router.get('/addPage', (req, res, next)=>{
  res.render('users/add');
});


/* add user. */
router.post('/addUser', (req, res, next)=>{
  usersService.addUser(req, res).then(params=>{
    let {err, user} = params;
    if(err){
      res.render('error', err);
    }else{
      res.redirect('/users');
    }
  });
});


/* userCenter. */
router.get('/userCenter/', (req, res, next)=>{
  usersService.getUserInfo(req, res).then(params=>{
    let {err, result} = params;
    if(err){
      res.render('error', err);
    }else{
      res.render('users/userCenter/index', result);
    }
  });
});




module.exports = router;
