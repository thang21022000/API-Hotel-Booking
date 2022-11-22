import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    price:{
        type: Number,
        default: true,
    },
    photo: {
        type: [String],
    },
    desc:{
        type: String,
    },
    maxPeople:{
        type: Number,
        require: true,
    },
    bed: {
        type: Number,
        require: true,
    },
    facilities:[{
        _id: false,
        option: String,
        value: Boolean,
    }],
    unAvailableDate: {
        type: [Date]
    }
},
{timestamps: true}
);

export default mongoose.model("Room", RoomSchema);