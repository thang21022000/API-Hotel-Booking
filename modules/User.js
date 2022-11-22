import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        require: true,
    },
    username:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    image : {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    bugdet: {
        type: Number,
        default: 0
    }
},
{timestamps: true}
);

export default mongoose.model("User", UserSchema);