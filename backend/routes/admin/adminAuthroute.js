const express = require('express');
const router = express.Router();
const {register, login, adminVerify, logout, getAllUser, deleteUser} = require('../../controller/adminController/admincontroller.js');
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate.js');
const adminUpload = require("../../multerConfig/adminMulter/adminStorageConfig.js");

 router.post('/register',adminUpload.single('admin_profile'),register);

 router.post('/login',login);

// logout route
router.get('/logout',adminAuthenticate,logout); 

//  Verify admin
 router.get('/verifyadmin',adminAuthenticate,adminVerify);

 //  admin- fetch all user
 router.get('/getalluser',adminAuthenticate,getAllUser);

  //  admin- delete particular user
  router.delete('/deleteuser/:userid',adminAuthenticate,deleteUser);

module.exports = router;