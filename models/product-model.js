const mongoose=require('mongoose');

const ProductSchema={
    Image : String,
    name : String,
    Price : String,
    discount : {
        type: Number,
        default: 0
    },
    bgcolor : String,
    panelColor : String,
    textColor : String
};

module.exports = mongoose.model("product",ProductSchema);