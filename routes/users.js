var express = require('express');
var router = express.Router();
var usersService = require('../services/usersService');
var websitesService = require('../services/websitesService');
var utils = require('../utils/utils');


/* check is logined */
router.all("*",function(req,res,next){

  var session=req.session;
  if(!session.user){//no login
    res.redirect('/loginPage');
  }else{
    next();
  }
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  usersService.getAll(req, res, function(err, result){
    if(err){
      res.render('error', err);
    }else{
      res.render('users/list', {users: result});
    }
  });
});

/* GET user detail. */
router.get('/getUser/:id', function(req, res, next) {
  usersService.get(req, res, function(err, result){
    if(err){
      res.render('error', err);
    }else{
      res.render('users/info', {user: result});
    }
  });
});


/* delete user. */
router.get('/delete/:id', function(req, res, next) {
  usersService.del(req, res, function(err){
    if(err){
      res.render('error', err);
    }else{
      res.redirect('/users');
    }
  });
});

/* go to add user page. */
router.get('/addPage', function(req, res, next) {
  res.render('users/add');
});


/* add user. */
router.post('/addUser', function(req, res, next) {
  usersService.addUser(req, res, function(err){
    if(err){
      res.render('error', err);
    }else{
      res.redirect('/users');
    }
  });
});


/* userCenter. */
router.get('/userCenter/', function(req, res, next) {
  usersService.getUserInfo(req, res, function(err, result){
    if(err){
      res.render('error', err);
    }else{
      res.render('users/userCenter/index', result);
    }
  });
});





module.exports = router;
