const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',(req, res)=>{
    if(isLoggedIn){
        res.redirect('/products');
        return;
    }
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth', {title: "Welcome to UrbanPouch"});
})

router.get('/shop', (req, res) => {
  
});

module.exports = router;