const mongoose = require("mongoose");

const productreviewSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    productid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

// model
const productreviewdb = new mongoose.model("productsreviews",productreviewSchema);
module.exports = productreviewdb;