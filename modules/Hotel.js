import mongoose from 'mongoose';

export const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    type:{
        type: String,
        require: true,
    },
    summary:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    desc:{
        type: String,
        require: true,
    },
    rating:{
        type: String,
    },
    rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
    }],    
    featured:{
        type: Boolean,
        default: false,
    },
});


export default mongoose.model("Hotel", HotelSchema);

