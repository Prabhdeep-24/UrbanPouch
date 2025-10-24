const mongoose=require('mongoose');

const ProductSchema= new mongoose.Schema({
    image : Buffer,
    name : String,
    price : String,
    discount : {
        type: Number,
        default: 0
    },
    bgcolor : String,
    panelColor : String,
    textColor : String
});

module.exports = mongoose.model("product",ProductSchema);