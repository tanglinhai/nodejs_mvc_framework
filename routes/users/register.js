const express = require('express');
const router = express.Router();
const registerService = require('../../services/users/registerService');
const utils = require('../../utils/utils');


/* get to user login page. */
router.get('/page', (req, res, next)=>{
    res.render('users/register');
});

/* GET user detail. */
router.post('/submit', (req, res, next)=> {
    registerService.register(req, res).then((result) => {
        if(result.code != 200){
            res.render('error', result);
        }else{
            if(result.data){
                req.session.user = result.data;
                res.redirect('/');
            }else{
                res.locals.registerResult = {
                    message: result.message
                };
                res.render('users/register');
            }

        }
    });
});

module.exports = router;
