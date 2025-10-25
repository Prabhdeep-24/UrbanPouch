const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next){
    if(!req.cookies.token){
        return res.redirect('/login');
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.
                findById(decoded.id)
                .select("-password");
        
        if(!user){
            req.flash('error_msg','User not found. Please log in again.');
            res.clearCookie('token');
            return res.redirect('/login');
        }

        req.user=user;
        next();
    }

    catch(err) {
        req.flash('error_msg', 'Session expired. Please log in again.');
        res.clearCookie('token');
        res.redirect('/login');
    }
}