const mongoose=require('mongoose');
const Ride = require('../models/Ride');
const VehicleTypes = ['car', 'bike', 'auto'];

exports.createRide=async(req,res)=>{
    const {source,destination,departureTime,price, vehicleType,allowedCount}=req.body;
    if(!source || !destination || !departureTime || price=== undefined || !vehicleType || !allowedCount) {
        return res.status(400).json({
            message:'All fields are required'
        })
    }
    if(!VehicleTypes.includes(vehicleType)) {
        return res.status(400).json({
            message:'Invalid vehicle type'
        })
    }
    if(new Date(departureTime)<new Date()) {
        return res.status(400).json({
            message:'Departure time must be in the future'
        })
    }
    if(Number(price)<0 || Number(allowedCount)<1) {
        return res.status(400).json({
            message:'Price must be a positive number and allowed count must be at least 1'
        })
    }
    const ride=await Ride.create({
        creator: req.userId,
        source,
        destination,
        departureTime,
        price:Number(price),
        vehicleType,
        allowedCount:Number(allowedCount)
    });
    res.status(201).json({id:ride._id});
};
exports.getRides=async(req,res)=>{
    const filter={departureTime:{$gt:new Date()}};
    const esc=(s)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
    if(req.query.source) {
        filter.source=new RegExp(esc(req.query.source),'i');
    }
    if(req.query.destination) {
        filter.destination=new RegExp(esc(req.query.destination),'i');
    }
    const rides=await Ride.find(filter).sort({departureTime:1}).populate('creator','name email phone');
    res.json(rides.map((r)=>toListItem(r,req.userId)));

};
exports.getMyRides=async(req,res)=>{
    const rides=await Ride.find({
        $or:[{creator:req.userId},{participants:req.userId}],
})
.sort({departureTime:1})
.populate('creator','name phone')
.populate('participants','name phone');
const now =new Date();
const mapped=rides.map((r)=>({ ride:r,data:toMyRide(r,req.userId)}));
res.json({
    upcoming:mapped.filter((m)=>m.ride.departureTime>now).map((m)=>m.data),
    past:mapped.filter((m)=>m.ride.departureTime<=now).map((m)=>m.data),
});
};