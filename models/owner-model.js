const mongoose = require('mongoose');

const ownerSchema={
    fullName : String,
    email : String,
    password : String,
    products : {
        type : Array,
        default : []
    },
    picture : String,
    gstNum: String
};

module.exports = mongoose.model('onwer',ownerSchema);