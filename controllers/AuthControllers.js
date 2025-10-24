const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

function validate(fullname, email, password){
    if(!fullname){
        return "Name is missing";
    }
    if(!email){
        return "Email is missing";
    }
    if(!password){
        return "password is missing";
    }
    return null;
}

module.exports.registerUser = async function registerUser(req,res){
    try{
    const {fullname, email, password} = req.body;

    let validation = validate(fullname, email, password);

    if(validation){
        return res.status(400).send(validation);
    }

    let user = await userModel.findOne({email : email});

    if(user){
        req.flash('error_msg','You already have an account, please log in');
        res.redirect('/');
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        fullname,
        email,
        password : hash
    });

    let token= await generateToken(newUser);
    res.cookie('token', token);

    res.status(201).redirect('/products');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

module.exports.loginUser = async function loginUser(req,res){
    let {email, password} = req.body;

    let user= await userModel.findOne({email: email});

    if(!user){
        return res.status(401).send("Email or Password is incorrect");
    }

    bcrypt.compare(password, user.password, (err,result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie('token', token);
            res.status(200).redirect('/products')
        }
        else{
            res.status(401).send("Email or Password is incorrect");
        }
    })    
}

module.exports.logoutUser = async function logoutUser(req,res){
    res.clearCookie('token'); 
    req.flash('success_msg', 'You have logged out successfully!');
    res.redirect('/'); 
}