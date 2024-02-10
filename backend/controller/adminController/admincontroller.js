const adminDB = require('../../model/adminModel.js');
const userDB = require('../../model/user/userModel.js');
const bcrypt = require('bcryptjs');
const cloudinary = require('../../Cloudinary/cloudinary.js');


// Register Admin
// POST method
exports.register = async(req,res)=>{
    const {name,email,mobile,password,confirmpassword} = req.body;
    const file = req.file?.path;

    if(!name || !email || !mobile || !password){
        res.status(400).json({error:"All fields are require"});
    }

    const upload = await cloudinary.uploader.upload(file);

    try {
        const emailVal = await adminDB.findOne({email:email});
        const mobileVal = await adminDB.findOne({mobile:mobile});

        if(emailVal){
            res.status(400).json({error:"This email is already exist"});
        }else if(mobileVal){
            res.status(400).json({error:"This mobile is already exist"});
        }else if(password !== confirmpassword){
            res.status(400).json({error:"Password and confirm password not match"});
        }else{
            const adminData = new adminDB({
                name,email,mobile,password,profile:upload.secure_url
            });

            await adminData.save();         //  save is used to save the data in db
            res.status(200).json(adminData)
        }
    } catch (error) {
        res.status(500).json(error);
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
        const adminValid = await adminDB.findOne({email:email});

        if(adminValid){
            const isMatch = await bcrypt.compare(password,adminValid.password);

            if(!isMatch){
                res.status(400).json({error:"Invaild Details"})
            }else{
                // generate token
                const token = await adminValid.generateAuthtoken();
                // console.log("token "+ token);

                const result = {
                    adminValid,
                    token
                }
                res.status(200).json(result);
            }
        }else{
            res.status(400).json({error:"Invalid Details"});
        }
    } catch (error) {
        console.log("error");
        res.status(500).json(error)
    }
}

exports.adminVerify = async(req,res)=>{
    try {
        const verifyadmin = await adminDB.findOne({_id:req.userId});
        if(!verifyadmin){
            return res.status(400).json({error:"Admin not verified"});
        }
        return res.status(200).json(verifyadmin);
    } catch (error) {
        // res.status(500).json({error:"Invalid Credentials"});
    }
}

exports.logout = async(req,res)=>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentUser)=>{
            return currentUser.token !== req.token;
        });

        req.rootUser.save();
        res.status(200).json({message:"Admin Successfully Logout"});
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getAllUser = async(req,res)=>{
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 4;
    try {
        const skip = (page - 1) * ITEM_PER_PAGE;            // next page pr kitni value dikhani hai

        const count = await userDB.countDocuments();
        const pageCount = Math.ceil(count/ITEM_PER_PAGE);

        const userData = await userDB.find()
        .limit(ITEM_PER_PAGE)
        .skip(skip)
        .sort({_id:-1})         // _id: -1 is se jo b data add hoga wo top pr show hoga na ki last me

        return res.status(200).json({
            Pagination:{
                count,pageCount
            },
            userData
        });
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.deleteUser = async(req,res)=>{
    const {userid} = req.params;

    try {
        const userDel = await userDB.findByIdAndDelete({_id:userid});
        res.status(200).json(userDel);
    } catch (error) {
        return res.status(200).json(error);
    }
}