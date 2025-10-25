const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model("user",userSchema);