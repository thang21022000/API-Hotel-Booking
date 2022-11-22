import express from 'express';
import {
    createRoom,
    updateRoom,
    getRoom,
    getRooms,
    availibilityRoom,
    getHotelsByRoomId,
    deleteRoomInAllHotel,
    deleteRoomInSpecificHotel,
    updateUnAvailableDateRoom,
} from '../controllers/Room.js'

import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);

// PUSH UNAVAILABLE ROOM
router.put("/availibility/:id", availibilityRoom);

// PULL UNAVAILABLE ROOM
router.put("/update/availibility/:id", updateUnAvailableDateRoom);

//DELETE ROOM IN ALL HOTELS
router.delete("/:id/", verifyAdmin, deleteRoomInAllHotel);

//DELETE ROOM IN SPECIFIC HOTEL
router.delete("/:id/:hotelid", verifyAdmin, deleteRoomInSpecificHotel);

// GET ROOMS VIA HOTELID
router.get("/gethotels/:id", getHotelsByRoomId);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);


export default router