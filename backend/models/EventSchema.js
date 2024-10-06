const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    eventName: { type: String, required: true },
    eventDate: { type: String, required: true },
    location: { type: String, required: true },
    eventImageUrl: { type: String, required: false },
    eventDetails: { type: String, required: false },
    vvip: { 
        price:{type:Number,required:false},
        maxSeat:{type:Number,required:false},
    },
    leftWing: { 
        price:{type:Number,required:false},
        maxSeat:{type:Number,required:false},
        bookedSeat:{type:Number}
    },
    rightWing: { 
        price:{type:Number,required:false},
        maxSeat:{type:Number,required:false},
        bookedSeat:{type:Number}
    },
    standingPrice: { type: Number, required: false },
    isStanding:{type:Boolean, default:false}
});

const event = module.exports = mongoose.model('Event', eventSchema);