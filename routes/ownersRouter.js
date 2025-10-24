const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const upload = require('../utils/uploadImage');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('/new', async (req, res)=>{
    res.render('newProduct',{title: "Add New Product"})
})

router.post('/new',upload.single("image"), async (req, res)=>{
    try{
        const {name, price, discount, color} = req.body;

        if (!req.file) {
            req.flash('error_msg', 'Please upload an image.');
            return res.redirect('/products/new');
        }

        const finalDiscount = discount && discount.trim() !== '' ? parseInt(discount) : 0;
    
        const newProduct= productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount: finalDiscount,
            color,
        });
    
        req.flash('success_msg', 'Product created Successfully!');
        res.redirect('/products/new')
    }
    catch(err){
        console.error("Error adding product:", err);
        req.flash('error_msg', 'Failed to add product.');   
        res.redirect('/products/new')
    }
})
module.exports = router;