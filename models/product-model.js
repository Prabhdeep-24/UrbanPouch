const mongoose=require('mongoose');

const ProductSchema= new mongoose.Schema({
    image : Buffer,
    name : String,
    price : String,
    discount : {
        type: Number,
        default: 0
    },
    color : String,
});

module.exports = mongoose.model("product",ProductSchema);