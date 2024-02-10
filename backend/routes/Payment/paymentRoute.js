const express = require('express');
const { processPayment } = require('../../controller/Payment/paymentController');
const router = express.Router();
const userAuthenticate = require('../../middleware/user/userAuthenticate');

 
//  User Contact route
 router.post('/payment',userAuthenticate,processPayment);
 

module.exports = router;