require('dotenv').config();
const express = require('express');
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const googleAuthDB = require('./model/user/googleAuthSchema.js');
const app = express();

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
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}));

app.get("/login/sucess",async(req,res)=>{
    // console.log(req);

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
