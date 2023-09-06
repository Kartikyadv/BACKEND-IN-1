// console.log("hello")
// console.log(3+2)




// const http = require("http");
// const name = require("./features")

// console.log(http)

// import name from "./features.js"
// import { name1, name2 } from "./features.js";
import {generatepercent} from './features.js'

// console.log(name)
// console.log(name1)
// console.log(name2)
import http from "http";
import fs from "fs";

const home = fs.readFileSync("./index.html");


const server = http.createServer((req,res)=>{
    // console.log("Served")
    // console.log(req.url);
    // res.end("helo");
    // res.end("<h1>holo</h1>");
    
    if(req.url === "/home"){
        // res.end(`<h1>${generatepercent()}</h1>`);
        // const home = fs.readFile("./index.html", (err,home) => {
            // console.log("file read")
            res.end(home)
        // });
        
        // console.log(home);

    }else if(req.url === "/about"){
        res.end("<h1>About Page</h1>");
    }else if(req.url === "/contact"){
        res.end("<h1>Contact Page</h1>");
    }



});

server.listen(5000, () => {
    console.log("Server is working");
});



// console.log(generatepercent())