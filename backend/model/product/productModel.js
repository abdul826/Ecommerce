const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    productimage:{
        type:String,
        require:true
    },
    discount:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    categoryid:{
        type:String,
        require:true
    },
},
{timestamps:true}
);

// model
const productsdb = new mongoose.model("productsmodels",productSchema);

module.exports = productsdb;
