import express from "express";
import path from 'path';
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
})
.then(()=> console.log("Database Connected"))
.catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const datacollection = mongoose.model("datacollection", userSchema)// CREATE COLLECTION

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.set("view engine", "ejs");// SET VIEW ENGINE FOR .EJS FILE

const isAuthenticated = async (req,res, next) => {
    const {token} = req.cookies;
    // console.log(token);

    if(token){
        const decodedToken = jwt.verify(token,"dassfdsfsddfsa");// DECODING/VERIFYING THE TOKEN WHICH WAS ENCRYPTED
    
        req.user = await datacollection.findById(decodedToken._id);// FOR STORING USER INFO IN req.user
        next();
    }else{
        res.redirect("/login");
    }
};

app.get("/", isAuthenticated, (req,res)=>{
    // console.log(req.cookies);
    // console.log(req.user);
    res.render("logout",{name:req.user.name}); 
});

app.get("/login", (req,res)=>{
    res.render("login");
});

app.get("/logout", (req,res)=>{
    res.cookie("token",null,{// FOR DELETING TOKEN / COOKIES AFTER LOGOUT
        httpOnly:true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});

app.get("/register", async (req,res) => {
    res.render("register");
});

app.post("/login", async (req,res)=>{
    const {name,email,password} = req.body;
    let user = await datacollection.findOne({email});
    if(!user) return res.redirect("/register");

    // const isMatch = user.password===password;
    const isMatch = await bcrypt.compare(password,user.password);
    
    if(!isMatch) 
    return res.render("login", {email,msg: "Wrong password"});

    const token  = jwt.sign({_id:user._id}, "dassfdsfsddfsa");// ENCODING TOKEN/USERID FOR SECURITY
    
        res.cookie("token", token,{// FOR SETTING TOKEN / COOKIES
            httpOnly:true,
        });
        res.redirect("/");
})

app.post("/register", async (req,res)=>{
    const {name,email,password} = req.body;

    let user = await datacollection.findOne({email});
    
    if(user) return res.redirect("/login");

        const hashedPassword = await bcrypt.hash(password,10);

        user = await datacollection.create({// CREATING COLLECTION IN DATABASE
            name,
            email,
            password: hashedPassword,
        });
    
        const token  = jwt.sign({_id:user._id}, "dassfdsfsddfsa");// ENCODING TOKEN/USERID FOR SECURITY
    
        res.cookie("token", token,{// FOR SETTING TOKEN / COOKIES
            httpOnly:true,
        });
        res.redirect("/");
        
});

app.listen(5000, ()=>{
    console.log("Server is working");
});