const mongoose=require('mongoose');

const userSchema={
    Name: String,
    email: String,
    password: String,
    Cart: {
        type: Array,
        default: []
    },
    Orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
};

module.exports = mongoose.model("user",userSchema);