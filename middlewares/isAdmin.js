const express = require('express');
const router = express.Router();

module.exports = (req, res, next)=>{
    try{
        if(!req.user){
            req.flash('error_msg','Only Admin allowed');
            res.redirect('/login');
            return;
        }
        if(!req.user.isAdmin){
            req.flash('error_msg','Only Admin allowed');
            res.redirect('/products');
            return;
        }
        next();
    }
    catch (err){
        res.status(404).send("Something went wrong");
    }
}