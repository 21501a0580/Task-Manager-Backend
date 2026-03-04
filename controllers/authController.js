const User = require('../models/user');
const bycrypt = require('bcryptjs');
const generateToken = require('../generateToken');

// Register User
const registerUser = async(req,res,next)=>{
   
    try{
        const {name,email,password,role} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
           
        return res.status(400).json({message:'User already exists'});
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    });

    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id,user.role)
    });
    }catch(error){
        next(error)
    }
}

// Login User
const loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    const passwordMatch = await bycrypt.compare(password,user.password);
    if(!passwordMatch){
        return res.status(400).json({message:'Password is incorrect'});
    }
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user._id,user.role)
    })
    }catch(error){
        next(error)
    }
    
}

module.exports = {registerUser,loginUser};
