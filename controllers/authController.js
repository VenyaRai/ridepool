const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const publicUser=(u)=>({id:u._id,name:u.name,email:u.email,phone:u.phone})
const makeToken=(user)=>jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
exports.register=async(req,res)=>{
    const {name,email,phone,password}=req.body;
    if(!name || !email || !phone || !password) {
        return res.status(400).json({
            message:'Name, email, phone, password  are required'
        })
    }
    if(password.length<6) {
        return res.status(400).json({
            message:'Password must be at least 6 characters'
        })
    }
    const exists=await User.findOne({email:email.toLowerCase()});
    if(exists) {
        return res.status(400).json({
            message:'Email already exists'
        })
    }
    const hashed=await bcrypt.hash(password,10);
    const user=await User.create({name,email,password:hashed});
    res.status(201).json({token:makeToken(user),user:publicUser(user)});
};

exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:(email||'').toLowerCase()});
    if(!user || !(await bcrypt.compare(password||'',user.password))) {
        return res.status(401).json({
            message:'Invalid email or password'
        })
    }
    res.json({token:makeToken(user),user:publicUser(user)});
};

exports.me=async(req,res)=>{
    const user=await User.findById(req.user.id);
    if(!user) {
        return res.status(404).json({
            message:'User not found'
        })
    }
    res.json({user:publicUser(user)});
};