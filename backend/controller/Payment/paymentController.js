const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async(req,res)=>{
    const {totalamount} = req.body;
    
    try {
        const myPayment = await stripe.paymentIntents.create({
            amount:totalamount,
            currency:"inr",
            metadata:{
                company:"EcommerceProject"
            }
        });

        return res.status(200).json(myPayment.client_secret)
    } catch (error) {
        return res.status(200).json(error);
    }
}