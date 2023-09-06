import { User } from "../models/user.js";


export const getAllUserData = async (req,res)=>{

    const users = await User.find({});

    // const id  = req.query;
    // console.log(id);
    
    res.json({
        success: true,
        message: "Suceesfully",
        users,
    });
};

export const addNewUser = async (req,res)=>{

    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password,
    });

    res.status(201).cookie("temp","o").json({
        sucess: true,
        message: "success",
    });
};


export const getUserById = async (req,res)=>{
    // const {id}  = req.body;
    // const user = await User.findById(id);
    
    // const {id} = req.query;
    // const user = await User.findById(id);
    
    // console.log(req.params);
    const {id} = req.params;
    const user = await User.findById(id);

    res.json({
        success:true,
        user,
    });
};


export const updateUserById = async (req,res)=>{
    
    const {id} = req.params;
    const user = await User.findById(id);

    res.json({
        success:"true",
        message: "Updated",
    });
};


export const deleteUserById = async (req,res)=>{

    const {id} = req.params;
    const user = await User.findById(id);

    await user.deleteOne();

    res.json({
        success:true,
        message: "Deleted",
    });
};