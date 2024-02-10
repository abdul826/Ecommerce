const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

SECERET_KEY = 'enter any thing;'

// Schema is nothing but we can design the structure of our collection
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email not valid");
            }
        }
    },
    profile:{
        type:String,
        // required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:12
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
    ],
},
{timestamps:true}
);

// Hash the password
adminSchema.pre("save", async function(next){
    // isModified method ka use is liye kiya hai ki jb b password modify ho tb hi change ho wrna nahi 
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

// Generate token
// token generate
adminSchema.methods.generateAuthtoken = async function () {
    try {
      let newToken = jwt.sign({ _id: this._id }, SECERET_KEY, {
        expiresIn: "1d",
      });
  
      this.tokens = this.tokens.concat({ token: newToken });
      await this.save();
      return newToken;
    } catch (error) {
      res.status(422).json(error);
    }
  };

// model
const adminDB = new mongoose.model('admins',adminSchema);

module.exports = adminDB;