const express = require('express');
const { addToCart, getcart, removeSingleItem, removeAllItem, DeleteCartsData } = require('../../controller/carts/cartController.js');
const userAuthenticate = require('../../middleware/user/userAuthenticate');
const router = express.Router();

// Addd tot Cart
router.post('/addtocart/:id',userAuthenticate, addToCart);

// Fetch cart Data
router.get('/getcart',userAuthenticate, getcart);

// Detele single item of a cart Data
router.delete('/removesingleitem/:id',userAuthenticate, removeSingleItem);

// DeleteAll item of a particula product from cart Data
router.delete('/removeallitem/:id',userAuthenticate, removeAllItem);

// Delete All cart Data
router.delete('/deleteallcartitem',userAuthenticate, DeleteCartsData);

module.exports = router;