const express = require('express');
const { addCategory, getCategory, addProduct, getallproducts, getSingleProduct, getLatestProduct, deleteProduct,
        productreview, getProductReview, deleteProductReview } = require('../../controller/product/productController');
const adminAuthenticate = require('../../middleware/admin/adminAuthenticate');
const userAuthenticate = require('../../middleware/user/userAuthenticate');
const productUpload = require('../../multerConfig/productMulter/productStorageConfig.js')
const router = express.Router();

// add category route
router.post('/addcategory', adminAuthenticate,addCategory);

// fetcg category route
router.get('/getcategory',getCategory);

// add Product route
router.post('/addproduct',[adminAuthenticate, productUpload.single("productimage")],addProduct);

// fetch all Products
router.get('/getallproducts',getallproducts);

// fetch all Products -- Search
router.get('/getallproducts/:search',getallproducts);

// fetch single Products
router.get('/getsingleproduct/:productid',getSingleProduct);

// fetch Latest Products
router.get('/getLatestproduct',getLatestProduct);

// delete Product
router.delete('/deleteproduct/:productid',adminAuthenticate,deleteProduct);

// products review 
router.post("/productreview/:productid",userAuthenticate,productreview);

//fetch products review 
router.get("/getproductreview/:productid",getProductReview);


//Delete products review 
router.delete("/deleteproductreview/:reviewid",userAuthenticate,deleteProductReview);


module.exports = router;