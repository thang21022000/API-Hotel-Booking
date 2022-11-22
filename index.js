import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import ordersRoute from "./routes/orders.js";
import paymentRoute from "./routes/payment.js";
import complaintsRoute from "./routes/complaints.js";
import ratingsRoute from "./routes/rating.js";

import "./addRequire.js";

import CookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB')
    } catch (error) {
        throw(error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log('Disconnected from MongoDB');
})

//middleWares
app.use(cors());
app.use(CookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/complaints', complaintsRoute);
app.use('/api/rating', ratingsRoute);




app.listen('8800', () => {
    connect();
    console.log("Connected to backend");
})