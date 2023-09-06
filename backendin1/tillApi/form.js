import express from "express";
import path from 'path';
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName: "backend",
})
.then(()=> console.log("Database Connected"))
.catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
});

const Mesg = mongoose.model("Message", messageSchema)

const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({extended:true}));
// console.log(path.join(path.resolve(), "public"))

app.set("view engine", "ejs");

app.get("/", (req,res)=>{
    res.render("index");
});

// app.get("/add", async (req,res)=>{
//     await Mesg.create({name:"kartik", email: "s@gmail.com", password : "kne"})
//         res.send("nice");
// });

app.get("/success", (req,res)=>{
    res.render("success");
});

app.get("/data", (req,res)=>{
    res.json({
        data,
    })
});

app.post("/", async (req,res) => {
    const {name,email,password} = req.body;

    await Mesg.create({name,email,password})
    // console.log(req.body);
    // data.push({name: req.body.name, email: req.body.email, password: req.body.password});
    // res.render("success"); THIS WILL GAYAB AFTER REFRESH
    res.redirect("/success")
})

app.listen(5000, ()=>{
    console.log("Server is working");
});