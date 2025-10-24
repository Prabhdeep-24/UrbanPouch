const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');

mongoose
.connect("mongodb://127.0.0.1:27017/UrbanPouch")
.then(()=>{
    dbgr("Database Connected...");
})
.catch((err)=>{
    dbgr("Something went wrong: ",err);
})

module.exports = mongoose.connection;