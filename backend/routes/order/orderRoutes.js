const express = require("express");
const router = new express.Router();
const userAuthenticate = require('../../middleware/user/userAuthenticate');
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate.js');
const { AddOrders, getUserOrders, getAllOrders, updateOrderStatus } = require("../../controller/Order/orderController");

// order routes
// for user module
router.post('/addorders',userAuthenticate,AddOrders);
router.get('/getuserorders',userAuthenticate,getUserOrders);

// for admin
router.get("/orders",adminAuthenticate,getAllOrders);
router.put("/orders/:orderid",adminAuthenticate,updateOrderStatus);


module.exports = router;