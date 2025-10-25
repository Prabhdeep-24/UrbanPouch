const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const {registerUser, loginUser, logoutUser} = require('../controllers/AuthControllers');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logoutUser);

router.get('/account', isLoggedIn, (req,res)=>{
    if(req.user.isAdmin){
        res.redirect('/owners/account');
        return;
    }
    res.render('userAcc',{title: `${req.user.fullname}`, user: req.user});
})

module.exports = router;