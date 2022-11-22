import express from 'express';
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    getHotelRooms,
} from '../controllers/hotel.js'

import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotels);


router.get("/room/:id", getHotelRooms);

export default router