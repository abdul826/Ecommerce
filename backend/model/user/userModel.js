const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

SECERET_KEY = 'enter any thing'

// Schema is nothing but we can design the structure of our collection
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
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
    userprofile:{
        type:String,
        required:true
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
    // forgot PAsssword
    verifytoken:{
        type:String
    }
},{timestamps:true});

// Hash the password
userSchema.pre("save", async function(next){
    // isModified method ka use is liye kiya hai ki jb b password modify ho tb hi change ho wrna nahi 
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

// Generate token
// token generate
userSchema.methods.generateUserAuthtoken = async function () {
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
const userDB = new mongoose.model('users',userSchema);

module.exports = userDB;