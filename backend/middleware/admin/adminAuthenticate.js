const adminDB = require('../../model/adminModel.js');
const jwt = require('jsonwebtoken');

SECERET_KEY = 'entar any thing'

const adminAuthenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
       

        if(!token){
            return res.status(400).json({error:"Token not valid"})
        }
        
        const verifyToken = jwt.verify(token,SECERET_KEY);  // toen generate k time pr SECERET_KEY ka use kiya tha to verify k time pr b usi ka use karenge ki user ki id mil jaye

        const rootUser = await adminDB.findOne({_id:verifyToken._id});

        if(!rootUser){
            throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser =  rootUser;
        req.userId = rootUser._id;

        next();
    } catch (error) {
        res.status(400).json({message:"Unauthorized User"});
    }
}

module.exports = adminAuthenticate;