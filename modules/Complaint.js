import mongoose from 'mongoose';

const ComplaintSchema = mongoose.Schema({
    idUser :{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    idHotel: {
        type: mongoose.Types.ObjectId,
        ref: "Hotel",
        required: true
    }
},
    {timestamps: true}
)

export default mongoose.model("Complaint", ComplaintSchema)