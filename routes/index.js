const express = require('express')
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/',isLoggedIn,(req, res)=>{
    res.redirect('/products');
})

router.get('/login',(req,res)=>{
    res.render('auth', {title: "Welcome to UrbanPouch"});
})

router.get('/cart', isLoggedIn,(req, res) => {
    res.render('cart',{title: "Shopping Cart"})
});

module.exports = router;