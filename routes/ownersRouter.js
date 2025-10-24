const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

router.get('/',(req,res)=>{
    res.send("Hey it's working");
})

module.exports = router;