const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');


mongoose
.connect(`${process.env.MONGODB_URI}/UrbanPouch`)
.then(()=>{
    console.log("Database Connected...");
})
.catch((err)=>{
    dbgr("Something went wrong: ",err);
})

module.exports = mongoose.connection;