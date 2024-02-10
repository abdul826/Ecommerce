const userDB = require('../../model/user/userModel.js');
const bcrypt = require('bcryptjs');
const cloudinary = require('../../Cloudinary/cloudinary.js');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require("fs");
const {transporter} = require('../../helper.js');
const userContactDb = require('../../model/user/userContactModel.js');
const ejs = require("ejs");

SECERET_KEY = 'abdulrahmankhanisbaaruserhaisamjha'

// Register User
// POST method
exports.register = async(req,res)=>{
    // console.log(req.body);
    const { firstname, lastname, email, password, confirmpassword } = req.body;


    if (!firstname || !email || !lastname || !password || !confirmpassword || !req.file) {
        res.status(400).json({ error: "all fileds are required" })
    }

    const file = req.file?.path;
    const upload = await cloudinary.uploader.upload(file);

    try {
        const preuser = await userDB.findOne({email:email});

        if(preuser){
            res.status(400).json({error:"this user is already exist"});
        }else if(password !== confirmpassword){
            res.status(400).json({error:"password and confirm password not match"});
        }else{
            const userData = new userDB({
                firstname, lastname, email, password, userprofile:upload.secure_url
            });

            // here password hashing
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

// Admin Login APi
// POST method
exports.login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({error:"All fields are require"});
    }
    
    try {
        const userValid = await userDB.findOne({email:email});

        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(400).json({error:"Invaild Details"})
            }else{
                // generate token
                const token = await userValid.generateUserAuthtoken();
                // console.log("token "+ token);

                const result = {
                    userValid,
                    token
                }
                res.status(200).json(result);
            }
        }else{
            res.status(400).json({error:"Invalid Details"});
        }
    } catch (error) {
        console.log("error");
        res.status(400).json(error)
    }
}

// user Verify
exports.userVerify = async(req,res)=>{
    try {
        const verifyUser = await userDB.findOne({_id:req.userId});
        res.status(200).json(verifyUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Logout
exports.logout = async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentUser)=>{
            return currentUser.token !== req.token;
        });

        req.rootUser.save();
        res.status(200).json({error:"User Successfully Logout"});
    } catch (error) {
        res.status(400).json(error);
    }
}

// Forgot Password
exports.forgotepassword = async(req,res)=>{
    const {email} = req.body;

    if(!email){
        return res.status(400).json({error:"Please Enter Your Email."})
    }

    try {
        const userFind = await userDB.findOne({email:email});

        if(userFind){
            // generate Token
            const token = jwt.sign({_id:userFind._id}, SECERET_KEY,{
                expiresIn:"120s"
            });

            // console.log("set",token);
            const setUserToken = await userDB.findByIdAndUpdate({_id:userFind._id},{verifytoken:token},{new:true});
            // console.log("set",setUserToken);
            // join email path 
            const emailTemplatepath = path.join(__dirname,"../../EmailTemplate/ForgotTemplate.ejs");
            const emailtemplateread = fs.readFileSync(emailTemplatepath,"utf8");   // utf8 is important otherwise it read the data in binary form 
           
            // console.log("emailTemplatepath",emailTemplatepath);
            // console.log("emailtemplateread",emailtemplateread);
           
            // Set token and logo value in ejs file
            const data = {
                passwordresetlink: `http://localhost:3000/resetpassword/${userFind.id}/${setUserToken.verifytoken}`,
                logo:"https://cdn-icons-png.flaticon.com/128/732/732200.png"
            }

            //  const passwordresetlink  = `http://localhost:3000/resetpassword/${userFind.id}/${setUserToken.verifytoken}`

            // console.log("data", data);
            // set dynamic value to ejs

             const renderTemplate = ejs.render(emailtemplateread,data);
            console.log(renderTemplate);

            if(setUserToken){
                console.log("insode IF");
                const mailOption = {
                    from:"abdulrehmankhan5000@gmail.com",
                    to: email,
                    subject : "Sending Email For Reset Password",
                    html : renderTemplate
                }

                transporter.sendMail(mailOption,(error,info)=>{
                    if(error){
                        console.log("error hai bhai yaha", error);
                        res.status(400).json({error:"MAil not send"});
                    }else{
                        console.log("email send", info.response);
                        res.status(200).json({message:"Email send successfully"});
                    }
                })
            }

        }else{
            return res.status(400).json({error:"User not exist with this e-mail."})
        }

    } catch (error) {
        console.log("error in forgot pass=>" , error);
        return res.status(400).json(error);
    }
}

// Verify the forget password
exports.forgotePasswordVerify  = async(req,res)=>{
    const {id,token} = req.params;

    try {
        const verifyUser = await userDB.findOne({_id:id, verifytoken:token});

        const verifyToken = jwt.verify(token,SECERET_KEY);

        if(verifyUser && verifyToken._id){
            return res.status(200).json({message:"Valid USer"});
        }else{
            return res.status(400).json({error:"User not exist"});
        }
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Reset the password
exports.resetPassword = async(req,res)=>{
console.log("inside resetPassword");
    const {id,token} = req.params;        // Take id and token from params 
    const {password} = req.body;           // get password from user

try {
    const validuser = await userDB.findOne({_id:id, verifytoken:token});

    const verifytoken = jwt.verify(token,SECERET_KEY);

    if(validuser && verifytoken){

        const newpassword = await bcrypt.hash(password,12);

        const setnewpassword = await userDB.findByIdAndUpdate({_id:id},{password:newpassword},{new:true})
        
        if(setnewpassword){
            await setnewpassword.save();
            res.status(200).json({message:"Password sucessfully updated"});
        }
    }else{
        res.status(400).json({error:"your session time out please generate newlink"})
    }
} catch (error) {
    res.status(400).json(error)
}
}

// Contact
exports.userContact = async(req,res)=>{
    const {name,email,message} = req.body;

    if(!name || !email || !message){
        return res.status(400).json({error:"Fields are required"});
    }

    try {
        const userConatctData = new userContactDb({
            name,email,message
        })

            await userConatctData.save();

            if(userConatctData){
               return res.status(200).json({message:"Message Send Successfully"});
            }
        
           return res.status(400).json({error:"Error while sending the message"});
        
    }catch (error) {
        res.status(400).json(error)
    }
}