import mongoose from 'mongoose';

const RatingSchema = mongoose.Schema({
    idUser :{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
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

export default mongoose.model("Rating", RatingSchema)