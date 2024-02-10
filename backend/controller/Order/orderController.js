const orderDb = require('../../model/Order/OrderModel.js');
const moment = require("moment");
const userDB = require('../../model/user/userModel.js');
const { transporter, orderConfirmationTemplate } = require('../../helper.js');

exports.AddOrders = async(req,res)=>{
    const { address, city, pincode, mobile, state, country, otherData, paymentdetails, itemsPrice, shippingPrice, totalPrice } = req.body;

    const deliverydate = moment().add(2, 'days').format('YYYY-MM-DD');

    try {
        const createOrder = new orderDb({
            userid: req.userId, address, city, pincode, mobile, state, country, otherData, paymentdetails,
            itemsPrice, shippingPrice, totalPrice, deliveredAt: deliverydate
        });
        
        await createOrder.save();
        return res.status(200).json(createOrder)
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getUserOrders = async(req,res)=>{
    try {
        const fetchUserOrder = await orderDb.find({userid: req.userId}).sort({_id:-1});
        return res.status(200).json(fetchUserOrder);
    } catch (error) {
        return  res.status(400).json(error);
    }
}

exports.getAllOrders = async(req,res)=>{
    try {
        const getOrders = await orderDb.find().sort({ _id: -1 });
        return res.status(200).json(getOrders)
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.updateOrderStatus = async(req,res)=>{
    const { orderid } = req.params;
    const { orderStatus } = req.body;

    try {
        const findOrderDetails = await orderDb.findOne({ _id: orderid });
        // console.log("findOrderDetails=>",findOrderDetails);

        const userdetails = await userDB.findOne({ _id: findOrderDetails.userid });

        // console.log("userdetails=>",userdetails);
        
//    console.log(userdetails);
        if (findOrderDetails.orderstatus == "Processing" && orderStatus == "Confirmed") {
            const updateOrder = await orderDb.findByIdAndUpdate({ _id: orderid }, { orderstatus: orderStatus }, { new: true });

            await updateOrder.save();

            const OrderTemplate = orderConfirmationTemplate(findOrderDetails,userdetails);

            // console.log("***************************************************");
// console.log("OrderTemplate=>",OrderTemplate);
            // console.log("updateOrder=>", updateOrder);


            // send invoice for order confirmation
            const mailOption = {
                from:"abdulrehmankhan5000@gmail.com",
                to: userdetails.email,
                subject : "Sending Email For Order Confirmation",
                // html: "YOUR order is confirmed"
                html : orderConfirmationTemplate(findOrderDetails,userdetails)
            }

            console.log("mailOption=>",mailOption);
            // console.log("***************************************************");
            
            transporter.sendMail(mailOption,(error,info)=>{
                if(error){
                    console.log("error hai bhai yaha", error);
                    res.status(400).json({error:"MAil not send"});
                }else{
                    console.log("email send", info.response);
                    res.status(200).json({message:"Email send successfully"});
                }
            })
            res.status(200).json(updateOrder)
        } else if (findOrderDetails.orderstatus == "Confirmed" && orderStatus == "Shipped") {
            const updateOrder = await orderDb.findByIdAndUpdate({ _id: orderid }, { orderstatus: orderStatus }, { new: true });

            await updateOrder.save();

            res.status(200).json(updateOrder)
        }else if(findOrderDetails.orderstatus == "Shipped" && orderStatus == "Delivered"){
            const updateOrder = await orderDb.findByIdAndUpdate({ _id: orderid }, { orderstatus: orderStatus }, { new: true });

            await updateOrder.save();

            res.status(200).json(updateOrder)
        }else{
            res.status(400).json({error:"invalid status"});
        }
    } catch (error) {
        console.log("Order Mail Error=>",error);
        res.status(400).json(error);
    }
}

