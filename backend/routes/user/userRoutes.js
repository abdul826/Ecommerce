const express = require('express');
const router = express.Router();
const { register, login, userVerify, logout, forgotepassword, forgotePasswordVerify, resetPassword,userContact } = require('../../controller/user/userController');
const userAuthenticate = require('../../middleware/user/userAuthenticate');
const userUpload = require("../../multerConfig/userMulter/userStorageConfig.js");
// const adminAuthenticate = require('../../middleware/admin/adminAuthenticate.js');

// Registration route
 router.post('/register',userUpload.single('userprofile'),register);

//  Login route
 router.post('/login',login);

// logout route
router.get('/logout',userAuthenticate,logout); 

//  Verify user route
 router.get('/userLoggedin',userAuthenticate,userVerify);

//  Forgot Password route
 router.post('/forgotepassword',forgotepassword);

//  Verify Forgot Password route
 router.get('/forgotepassword/:id/:token',forgotePasswordVerify);

//  Reset Password route
 router.put('/resetepassword/:id/:token',resetPassword);
 
//  User Contact route
 router.post('/usercontact',userContact);
 

module.exports = router;