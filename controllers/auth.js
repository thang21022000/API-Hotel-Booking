import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import {createError} from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        })
        await newUser.save();
        res.status(200).send("User has been created");

    } catch (err) {
        next(err)
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "User not found"))

        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isCorrectPassword) return next(createError(400, "Please check you Username or Password "))

        const token = jwt.sign({userId: user._id, isAdmin: user.isAdmin}, "2525")
        
        const {password, isAdmin, ...otherDetail} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({details:{...otherDetail}, isAdmin});

    } catch (err) {
        next(err)
    }
};

