const cartDB = require('../../model/carts/cartsModel.js');
const productsdb = require('../../model/product/productModel.js');

// Add tot cart API
exports.addToCart = async(req,res)=>{
    const {id} = req.params; // product id get karenge data cart me add krwane k liye

    try {
        const productData = await productsdb.findOne({_id:id});      // check kr rahe hai jo id get kiye hai URL se wo hai product k schema me ya nahi 
                                                                    // agar id match hoti hai to wo pura product "productData" variable se aa jayega
        
        // yaha user ki ID and product ki id cart schema me dekh rahe hai agar match hota hai to mtlb data us id se related aready hai 
        const carts = await cartDB.findOne({userid:req.userId, productid:productData._id});

        // yaha pr product schema  k andar product ki quantity check kr rahe hai agar qnt >= 1 hua to add to cart krwayenge otherwise product sold out message show karenge 
        if(productData?.quantity >= 1){
            // agar carts true hai to mtlb already product us particular id se add hai tb hm product ki quantity ko inc krwayenge 
        // wrna else me jayega code aur userid,productdata add krwayenge and quantity ko 1 karenge
        if(carts?.quantity >= 1){
            carts.quantity = carts.quantity + 1;
            await carts.save();

            productData.quantity = productData.quantity - 1;
            await productData.save();

            return res.status(200).json({message:"Product Increment successfully in your cart"});
        }else{
            const addtocart = new cartDB({
                userid:req.userId,
                productid:productData._id,
                quantity:1
            });

            // save add to cart
            await addtocart.save();

            // decrement product qnty from product schema
            productData.quantity = productData.quantity - 1;
            await productData.save();

            return res.status(200).json({message:"Product added successfully in your cart"});
        }
        }else{
             return res.status(400).json({error:"Product sold out. Please choose another product"});
        }

        
    } catch (error) {
        return res.status(400).json(error);
    }
}

// Fetch Cart API
// CartData me hame userid and product ID donno chahiye jis se hm us particular product ko fetch kr sake.
// So we use aggrigation method
exports.getcart = async(req,res)=>{
    try {
        const getCartData = await cartDB.aggregate([
            {
                $match: {userid: req.userMainId}        // match k help se hm user ki id match krwayenge 
            },
            {

                //lookup ka use two tables ko join kerne k liye use kiya jata hai
                $lookup:{
                    from:"productsmodels",      // from -> data kaha se lene hai  
                    localField:"productid",     // localField -> cart k andar field ka kya name hai 
                    foreignField:"_id",         // foreignField -> kis field se match krwana hai
                    as:"productDetails"         // as -> create an array and feth the details according to {from,localField,foreignField value} 
                }
            },
            // getting first data from cart array
            {
                $project:{
                    _id:1,          // ye 4 values hame chahiye to hm ne 1 mention kiya hai 
                    userid:1,
                    productid:1,
                    quantity:1,
                    productDetails : {$arrayElemAt: ['$productDetails', 0]}    // cart details me  productDetails array of object 
                                                                              //mil raha hai us ko object me llane k liye $project 
                                                                             // aggrigation ka use kiya hai, 0 position ki value hame dega  
                }
            }
        ]);

        res.status(200).json(getCartData);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Remove single item
exports.removeSingleItem = async(req,res)=>{
    const {id} = req.params; // product ki id get kr rahe hai url se

    try {
        const productData = await productsdb.findOne({_id:id});

        const carts = await cartDB.findOne({userid:req.userId, productid:productData._id});

        if(!carts){
            return res.status(400).json({message:"Data not found in cart"});
        }

        if(carts.quantity == 1){
            const deleteCartItem = await cartDB.findByIdAndDelete({_id:carts._id});

            // Increment product qnty from product schema
            // console.log(productData.quantity);
            productData.quantity +=  1;
            // console.log(productData.quantity);
            await productData.save();

            return res.status(200).json({message:"Successfully item remove from cart"});
        }else if(carts.quantity > 1){
            carts.quantity -= 1;
            await carts.save();
            // console.log(productData.quantity);
            // console.log(productData.quantity + 1);
            // Increment product qnty from product schema
            productData.quantity += 1;
            await productData.save();
            // console.log(productData.quantity);
            return res.status(200).json({message:"Successfully item decrement from cart"});
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.removeAllItem = async(req,res)=>{
    const {id} = req.params; // product ki id get kr rahe hai url se

    try {
        const productData = await productsdb.findOne({_id:id});

        const carts = await cartDB.findOne({userid:req.userId, productid:productData._id});

        if(!carts){
            return res.status(400).json({message:"Data not found in cart"});
        }

        const deleteParticularProduct = await cartDB.findByIdAndDelete({_id: carts._id});

        productData.quantity = productData.quantity + carts.quantity;
        await productData.save();

        return res.status(200).json({message:"Item successfully remove from cart", deleteParticularProduct});
    } catch (error) {
        return res.status(400).json(error);
    }
}

// DeleteCartsData
exports.DeleteCartsData = async(req,res)=>{
    try {
        const DeleteCarts = await cartDB.deleteMany({userid:req.userId});   // ha pr jo user login hai wo check kr rahe agar mila to us user se relate sb data cart se delete ho jayega 
        res.status(200).json(DeleteCarts);
    } catch (error) {
        res.status(400).json(error)
    }
}