import Hotel from '../modules/Hotel.js'
import Room from '../modules/Room.js'

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch(err) {
        next(err);
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel);
    }
    catch(err) {
        next(err);
    }
}


export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel was deleted");
    }
    catch(err) {
        next(err);
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate(['rooms', {
            path: 'comment',
            populate: {path: "idUser", model: "User"}}
        ]);
        res.status(200).json(hotel);
    }
    catch(err) {
        next(err);
    }
}

export const getHotels = async (req, res, next) => {
    const { min, max, city, type, facilities, page, ...others} = req.query;
   
    let arrType;
    let arrFacilities = [];

    if(type) {
        arrType = type.split(',');
    }
    if(facilities) {
        facilities.split(',').map(facility => {
            arrFacilities.push({
                "$elemMatch": {
                    "option": facility,
                    "value": true
                }
            })
        })
    }
    try {
        let hotels;
        if (city) {
            hotels = await Hotel.find({
                ...others, 
                city: {'$regex' : city, '$options': '-i' },
            }).limit(req.query.limit).populate({ 
                path: "rooms", 
                match: {
                    price : {$gt: min || 1, $lt: max || 1000000}
                }
            });
        } else if (type) {
            hotels = await Hotel.find({
                ...others, 
                type: {$in: arrType || []},
            }).limit(req.query.limit).populate({ 
                path: "rooms", 
                match: {
                    price : {$gt: min || 1, $lt: max || 1000000}
                }
            });
        }else if (facilities) {
            hotels = await Hotel.find({
                ...others, 
            }).limit(req.query.limit).populate({ 
                path: "rooms", 
                match: {
                    price : {$gt: min || 1, $lt: max || 1000000},
                    facilities: {$all: arrFacilities}
                }
            });
        } else if (page) {
            hotels = await Hotel.find({
                ...others, 
            }).skip((page - 1) * 6).limit(4).populate({ 
                path: "rooms", 
                match: {
                    price : {$gt: min || 1, $lt: max || 1000000},   
                }
            });
        } else {
            hotels = await Hotel.find({
                ...others, 
            }).populate({ 
                path: "rooms", 
                match: {
                    price : {$gt: min || 1, $lt: max || 1000000},   
                }
            });
        }

        res.status(200).json(hotels)
    }
    catch(err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);
    try {
        const list = await Promise.all( 
            hotel.rooms.map(room => {
                return Room.findById(room);
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err);
    }

}