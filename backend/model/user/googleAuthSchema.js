const mongoose = require("mongoose");

const googleAuthSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});


const googleAuthDB = new mongoose.model("googleAuth",googleAuthSchema);

module.exports = googleAuthDB;