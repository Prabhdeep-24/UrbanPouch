const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:3000/UrbanPouch");

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