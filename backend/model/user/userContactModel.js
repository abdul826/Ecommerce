const mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    message:{
        type:String,
        required:true
    },
},{timestamps:true});

const userContactDb = mongoose.model("userContacts",userContactSchema);
module.exports = userContactDb;