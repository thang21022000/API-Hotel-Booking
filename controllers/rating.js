import Rating from "../modules/Rating.js";


export const createRating = async (req, res, next) => {
    const newRating = new Rating(req.body)

    try {
        const savedRating = await newRating.save();
        res.status(200).json(savedRating)

    } catch (err) {
        next(err);
    }
}

export const getRating = async (req, res, next) => {
    try {
        const response = await Rating.find({idHotel: req.params.id});
        res.status(200).json(response)

    } catch (err) {
        next(err);
    }
}