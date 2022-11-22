import Hotel from '../modules/Hotel.js';
import Room from '../modules/Room.js';

import { createError } from '../utils/error.js';

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid; 
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, { 
                $push: {rooms: savedRoom._id}
            });
        } catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch(err) {
        next(err);
    }
}

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedRoom);
    }
    catch(err) {
        next(err);
    }
}

export const availibilityRoom = async (req, res, next) => {
    try {
        const updatedAvailibiltyRoom = await Room.findByIdAndUpdate(req.params.id, {$push: {"unAvailableDate" : req.body.dates}});
        res.status(200).json(updatedAvailibiltyRoom);
    }
    catch(err) {
        next(err);
    }
}

export const updateUnAvailableDateRoom = async (req, res, next) => {
    let roomList = [];
    roomList = (req.params.id).split(',');
    try {
        await Room.updateMany(
            {
                _id: {$in : roomList},
            },
            {
                $pull: {
                    unAvailableDate: {$in: req.body.listDateOld}
                }
            },
            {
                multi: true
            }
        )
        res.status(200).json("unAvailableDate room is updated");
    } catch (err) {
        createError(err)
    }
}

export const deleteRoomInAllHotel= async (req, res, next) => {
    try {
        await Room.findByIdAndDelete(req.params.id)
        try { 
                await Hotel.updateMany({rooms: req.params.id}, {
                    $pull: {rooms: req.params.id}
                })
            
        } catch(err) {
            next(err);
        }
        res.status(200).json("Room was deleted in all hotels");
    }
    catch(err) {
        next(err);
    }
}

export const deleteRoomInSpecificHotel = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        // await Room.findByIdAndDelete(req.params.id)
        try { 
                await Hotel.findByIdAndUpdate(hotelId, {
                $pull: {rooms: req.params.id}
            })
        } catch(err) {
            next(err);
        }
        res.status(200).json("Room was deleted");
    }
    catch(err) {
        next(err);
    }
}

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(err) {
        next(err);
    }
}

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    }
    catch(err) {
        next(err);
    }
}


export const getHotelsByRoomId = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({rooms: req.params.id});
        res.status(200).json(hotels)
    }
    catch(err) {
        next(err);
    }
}