const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const {registerUser, loginUser, logoutUser} = require('../controllers/AuthControllers');
const isLoggedIn = require('../middlewares/isLoggedIn');

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/logout',logoutUser);

module.exports = router;