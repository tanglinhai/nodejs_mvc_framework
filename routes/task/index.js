const express = require('express');
const router = express.Router();
const taskService = require('../../services/task/indexService');
const utils = require('../../utils/utils');

/* go to index page */
router.get("/",(req,res,next)=>{
    res.render('task/index');
});
router.get("/index.html",(req,res,next)=>{
    res.render('task/index');
});






module.exports = router;
