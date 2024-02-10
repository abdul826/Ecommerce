const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    productid:{
        type:Object,
        require:true
    },
    quantity:{
        type:Number
    }
},{timestamps:true});

// modal
const cartDB = new mongoose.model('carts', cartSchema);

module.exports = cartDB;