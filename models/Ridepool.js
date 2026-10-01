const mongoose=require('mongoose')

const RideSchema=new mongoose.Schema({
    source:String,
    destination:String,
    completed:Boolean
})

module.exports=mongoose.model('Ridepool',RideSchema)