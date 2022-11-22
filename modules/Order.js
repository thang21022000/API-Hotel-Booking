
import mongoose from "mongoose";
import { HotelSchema } from "./Hotel.js";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    options: {adult: Number, children: Number, room: Number},
    
    hotel: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Hotel",
        required: true
    },
    roomList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }],
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    bill: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, 
{timestamps: true}
)

export default mongoose.model("Order", OrderSchema);