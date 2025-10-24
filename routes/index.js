const express = require('express')
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('auth', {title: "Welcome to UrbanPouch"});
})

router.get('/shop', (req, res) => {
  
});

module.exports = router;