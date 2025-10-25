const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const upload = require('../utils/uploadImage');
const isAdmin = require('../middlewares/isAdmin');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

router.get('/new',isLoggedIn, isAdmin ,async (req, res)=>{
    res.render('newProduct',{title: "Add New Product", user: req.user})
})

router.get('/account',isLoggedIn, isAdmin ,(req,res)=>{
    res.render('adminAcc',{title: "Admin Account", user: req.user});
});

router.post('/new',isLoggedIn ,isAdmin ,upload.single("image"), async (req, res)=>{
    try{
        const {name, price, discount, color} = req.body;

        if (!req.file) {
            req.flash('error_msg', 'Please upload an image.');
            return res.redirect('/owners/new');
        }

        const finalDiscount = discount && discount.trim() !== '' ? parseInt(discount) : 0;
    
        const newProduct= await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount: finalDiscount,
            color,
        });
        
        req.flash('success_msg', 'Product created Successfully!');
        res.redirect('/owners/new')
    }
    catch(err){
        req.flash('error_msg', 'Failed to add product.');   
        res.redirect('/owners/new')
    }
})
module.exports = router;