import express from "express";
import path from "path";

const app = express();

app.get("/", (req,res)=>{
    // res.send("he");
    // res.statusCode = 404;
    // res.sendStatus(200);
    // res.json({
    //     id: 1,
    //     name: "kartik",
    // });
    // res.status(400).send("chaining");

    // const file = fs.readFileSync("./index.html");

    const pathlocation = path.resolve();
    // console.log(path.join(pathlocation,"./index.html"));
    res.sendFile(path.join(pathlocation,"./index.html") );
});

app.listen(5000, () => {
    console.log("Server is working");
});