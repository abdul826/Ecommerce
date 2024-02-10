const userDB = require('../../model/user/userModel.js');
const jwt = require('jsonwebtoken');

SECERET_KEY = 'enter any thing'

const userAuthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
       

        if(!token){
           return res.status(400).json({error:"Token not valid"})
        }
        
        const verifyToken = jwt.verify(token,SECERET_KEY);  // toen generate k time pr SECERET_KEY ka use kiya tha to verify k time pr b usi ka use karenge ki user ki id mil jaye

        const rootUser = await userDB.findOne({_id:verifyToken._id});

        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser =  rootUser;
        req.userId = rootUser._id;
        req.userMainId = rootUser.id;       //give only ID in form of STRING

        next();
    } catch (error) {
        res.status(400).json({error:"Unauthorized User"});
    }
}

module.exports = userAuthenticate;