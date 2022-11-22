import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        next(createError(404, "You are not authenticated"));
    }
    jwt.verify(token, "2525", (err, user) => {
        if(err) {
            next(createError(403, "Token is invalid"));
        }

        req.user = user;
        next();
    })
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.userId === req.params.id || req.user.isAdmin){
            next();
        }
        else {
            return next(createError(403, "You are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.isAdmin){
            next();
        }
        else {
            return next(createError(403, "You are not authorized"));
        }
    });
}

