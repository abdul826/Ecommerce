const categorydb = require('../../model/product/productCategoryMOdel.js');
const productsdb = require('../../model/product/productModel.js');
const productreviewdb = require('../../model/product/productReviewModel.js');
const cloudinary = require('../../Cloudinary/cloudinary.js');

// Add catogery API
exports.addCategory = async (req, res) => {
    const { categoryname, description } = req.body;

    if (!categoryname || !description) return res.status(400).json({ message: "Fields are required" });

    try {
        const existingCategory = await categorydb.findOne({ categoryname: categoryname });

        if (existingCategory) return res.status(400).json({ message: "Category Already exist.Please choose another" });

        const addNewCategory = new categorydb({
            categoryname, description
        });

        await addNewCategory.save();

        return res.status(200).json(addNewCategory);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// FEtch Category API
exports.getCategory = async (req, res) => {
    try {
        const fetchAllCategory = await categorydb.find();
        return res.status(200).json(fetchAllCategory);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

// Add Product
exports.addProduct = async (req, res) => {
    const { categoryid } = req.query;

    const file = req.file ? req.file.path : "";
    const { productname, price, discount, quantity, description } = req.body;

    if (!productname || !price || !discount || !quantity || !description) return res.status(400).json({ message: "All fields are require" });

    try {
        const upload = cloudinary.uploader.upload(file);

        // Check existing product
        const existProduct = await productsdb.findOne({ productname: productname });

        if (existProduct) return res.status(400).json({ message: "Product already exist.Please upload another product." });

        const addNewProduct = new productsdb({
            productname, price, discount, quantity, description, categoryid, productimage: (await upload).secure_url
        });
        await addNewProduct.save();

        return res.status(200).json(addNewProduct);

    } catch (error) {
        return res.status(500).json(error);
    }
}

// Fetch ALl Products API
exports.getallproducts = async (req, res) => {

    const search = req.query.search || "";

    const  price = req.query.price;
    
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 4;

    const categoryid = req.query.categoryid;

    query = {
        productname: { $regex: search, $options: "i" }
    }
    

    // const query = {};    // ye query ka object blank is liye liya hai ki hamare pass url me multiple queries ho sakti hai 

    if (categoryid !== "all" && categoryid) {
        query.categoryid = categoryid;          // yaha pr url me query categoryid mili to query ka object jo uper define kiya hai usi me aggign kr diya 
    }
    
    try {
        const skip = (page - 1) * ITEM_PER_PAGE;

        // Product Count
        const count = await productsdb.countDocuments();   // countDocuments is a function which is used for count the database values

        // const page Count
        const pageCount = Math.ceil(count / ITEM_PER_PAGE);


        const allProducts = await productsdb.find(query)        // in place of query we can also write {categoryid:categoryid}
            .limit(ITEM_PER_PAGE)                                   // limit is a function which is used to show limited data on page
            .skip(skip);                                            //  Skip is a function which is used to skip the page and go to next 

        
            if (!allProducts || allProducts.length === 0) {
                return res.status(404).json({ message: "No Products Found" });
            }
        

        if (!allProducts) return res.status(400).json({ message: "No Product Found" });

        return res.status(200).json({
            allProducts,
            Pagination: {
                totalProducts: count,
                pageCount
            }
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Fetch single product
exports.getSingleProduct = async (req, res) => {
    const { productid } = req.params;

    try {
        const getProduct = await productsdb.findOne({ _id: productid });

        if (!getProduct) return res.status(400).json({ message: "Product Not Fount" });
        // console.log(getProduct);
        return res.status(200).json(getProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//fetch Latest Product
exports.getLatestProduct = async (req, res) => {
    try {
        const latestProduct = await productsdb.find().sort({ _id: -1 });   // -1 means decending order and 1 menas assending order

        if (!latestProduct) return res.status(400).json({ message: "Product Not Found" });

        return res.status(200).json(latestProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Delete Product
exports.deleteProduct = async (req, res) => {
    const { productid } = req.params;

    try {
        const deleteProduct = await productsdb.findByIdAndDelete({ _id: productid })
        return res.status(200).json(deleteProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Product Review
exports.productreview = async (req, res) => {
    const { productid } = req.params;
    const { username, rating, description } = req.body;

    if (!productid || !username || !rating || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const addProductReview = new productreviewdb({
            userid: req.userMainId,
            productid,
            username,
            rating,
            description
        });

        await addProductReview.save();

        return res.status(200).json(addProductReview);
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Fetch PRoduct Review
exports.getProductReview = async (req, res) => {
    const { productid } = req.params;

    try {
        const getReview = await productreviewdb.find({ productid: productid });

        return res.status(200).json(getReview);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// Delete Product Review
exports.deleteProductReview = async (req, res) => {
    const { reviewid } = req.params;

    try {
        const deletetReview = await productreviewdb.findByIdAndDelete({ _id: reviewid });

        return res.status(200).json(deletetReview);
    } catch (error) {
        return res.status(500).json(error);
    }
}

