import Complaint from "../modules/Complaint.js";
import Hotel from "../modules/Hotel.js";

export const createComplaint = async (req, res, next) => {
    const newComplaint = new Complaint(req.body)

    try {
        const savedComplaint = await newComplaint.save();
        try {
            await Hotel.findByIdAndUpdate(req.body.idHotel, {
                $push: {comment : savedComplaint._id}
            })
        } catch (err) {

        }
        res.status(200).json(savedComplaint)
    } catch (err) {
        next(err);
    }
}