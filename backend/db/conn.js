const mongoose = require('mongoose');

const DB = process.env.URI;

mongoose.connect(DB).then(()=>{
    console.log(`Connection Successfully`)
}).catch((error)=>{
    console.log("err", error);
})