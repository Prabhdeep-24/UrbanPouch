const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const upload = require('../utils/uploadImage');

router.get('/',async (req,res)=>{
    const products = await productModel.find();

    res.render('products', {title: "Our Products",products});
})

router.get('/new',async (req, res)=>{
    res.render('newProduct',{title: "Add New Product"})
})

router.post('/new', upload.single("image"), async (req, res)=>{
    try{
        const {name, price, discount, bgcolor, panelColor, textColor} = req.body;
    
        const newProduct= productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelColor,
            textColor
        });
    
        await newProduct.save();
        req.flash('success_msg', 'Product created Successfully!');
        res.redirect('/products/new')
    }
    catch(err){
        req.flash('error_msg', 'Failed to add product.');   
        res.redirect('/products/new')
    }
})
module.exports = router;