const express = require('express');
const router = express.Router();
const indexService = require('../../services/learn/indexService');
const utils = require('../../utils/utils');

/* go to index page */
router.get("/",(req,res,next)=>{
    res.render('learn/index');
});
router.get("/index.html",(req,res,next)=>{
    res.render('learn/index');
});






module.exports = router;
