require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const googleAuthDB = require('./model/user/googleAuthSchema.js');
const app = express();

//Connect to database
require('./db/conn.js');

// Admin Route
const adminAuthroutes = require('./routes/admin/adminAuthroute.js');

// Product Route
const productRoutes = require('./routes/products/productroutes.js');

// User Route
const userRoutes = require('./routes/user/userRoutes.js');

// Cart Route
const cartRoutes = require('./routes/carts/cartRoutes.js');

// Prder Route
const orderRoute = require('./routes/order/orderRoutes.js')

// Payment Route
const paymentRoute = require('./routes/Payment/paymentRoute.js')

const port = 8000;

app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));    // To handle the api url 

app.use(express.json());        // To handle teh json data which comes from frontend

// Google auth

const clientID = process.env.clientID

const clientSecret = process.env.CLIENTSECRET;

// setup session
app.use(session({
    secret:process.env.GOOGLESECRETKEY,
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientID,
        clientSecret:clientSecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        // console.log("profile",profile);
        try {
            let user = await googleAuthDB.findOne({googleId:profile.id});

            if(!user){
                user = new googleAuthDB({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/",
    failureRedirect:"http://localhost:3000/login"
}));

app.get("/login/sucess",async(req,res)=>{
    console.log(req.user);

    try {
        if(req.user){       //express session hm use kr rahe hai us se user mil raha hai hame
            res.status(200).json({message:"user Login",user:req.user})
        }else{
            res.status(400).json({message:"Not Authorized"})
        }
    } catch (error) {
        
    }
});

app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
});

// API call URL
app.use('/adminauth/api',adminAuthroutes);
app.use('/product/api',productRoutes);
app.use('/user/api',userRoutes);
app.use('/cart/api',cartRoutes);
app.use('/order/api',orderRoute);
app.use('/checkout/api',paymentRoute);

app.listen(port,()=>{
    console.log(`listen on port ${port}`);
})