const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin = require('../middlewares/isAdmin');


router.get('/',isLoggedIn ,async (req, res) => {
  try {
    const products = await productModel.find().lean();

    res.render('products', { title: "Our Products", products , user:req.user});
  } catch (err) {
    console.error("🔥 Error caught route:", err);
    req.flash('error_msg', 'Failed to load products.');
    res.redirect('/products');
  }
});

router.delete('/:id',isLoggedIn ,isAdmin, async (req, res)=>{
    try{
        const deletedProd = await productModel.findByIdAndDelete(req.params.id);

        if(!deletedProd){
            req.flash('error_msg','Product do not exists');
            return res.json({success : false}).redirect('/products');
        }
        
        // req.flash('success_msg','Product deleted successfully!');
        res.json({success : true}).redirect('/products');
    }
    catch(err) {
        console.error("🔥 Error caught in delete route:", err);
        req.flash('error_msg','Something went wrong');
        res.json({success : false}).redirect('/products');
    }
});

module.exports = router;