import Order from '../modules/Order.js';
import Room from '../modules/Room.js';
import User from '../modules/User.js';
import { createError } from '../utils/error.js';

export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err);
    }
}


//GET ORDER 
export const getOrder = async (req, res, next) => {
    try {
        const oder = await Order.findById(req.params.id).populate([{path: "hotel", populate: {path: 'rooms', model:'Room'}},"user","roomList"]);
        res.status(200).json(oder);
    } catch (err) {
        createError(err);
    }
}


// GET ALL ORDERS
export const getOrders = async (req, res, next) => {
    try {
        const oder = await Order.find().populate(["hotel","user","roomList"]);
        res.status(200).json(oder);
    } catch (err) {
        createError(err);
    }
}

// GET THE LEATEST ORDER BY USER
export const getOrderByUser = async (req, res, next) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    try {
        const oders = await Order.find({"checkIn": {
            $gte: today.toISOString()
        }}).populate(["hotel", "user", "roomList"])
        res.status(200).json(oders);
    } catch (err) {
        createError(err);
    }
}

// DELETE ORDER
export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        try {
            await Room.updateMany(
                {
                    _id: {$in: req.body.listRoomId}
                },
                {
                    $pull: {
                        unAvailableDate: {$in: req.body.listDate}
                    }
                },
                {
                    multi: true
                }
            )
        } catch (err) {
            console.log(err)
        }
        res.status(200).json("Order is deleted");
    } catch (err) {
        createError(err);
    }
}

export const deleteOrderandUpdateUser = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        try {
            await User.findByIdAndUpdate(req.params.iduser, {$inc: {"bugdet": req.body.bill}})
        } catch (err) {
            createError(err);
        }
        res.status(200).json("Order is deleted and updated budget");
    } catch (err) {
        createError(err);
    }
}


// ['2022-10-29T17:00:00.000Z', '2022-10-30T17:00:00.000Z', '2022-10-31T17:00:00.000Z', '2022-11-01T17:00:00.000Z']

// ['2022-11-2T17:00:00.000Z', '2022-11-3T17:00:00.000Z']
export const updateOrder = async (req, res, next) => {
    try {
        const savedOrder = await Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        try {
            await Room.updateMany(
                {
                    _id: {$in : req.body.roomList},
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
        } catch (err) {
            createError(err)
        }
        try {
            await Room.updateMany(
                {
                    _id: {$in : req.body.roomList},
                },
                {
                    $push: {
                        unAvailableDate: req.body.listDateUpdate
                    }
                },
                {
                    multi: true
                }
            )
        } catch (err) {
            createError(err)
        }
        res.status(200).json(savedOrder)
    } catch (err) {
        createError(err);
    }
}
