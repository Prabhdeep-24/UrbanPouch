const express = require('express');
const router = express.Router();
const productModel = require('../models/product-model');
const isLoggedIn = require('../middlewares/isLoggedIn');


router.get('/',async (req, res) => {
  try {
    const products = await productModel.find().lean();
    console.log("Fetched products from DB:", products);

    res.render('products', { title: "Our Products", products });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    req.flash('error_msg', 'Failed to load products.');
    res.redirect('/');
  }
});

module.exports = router;