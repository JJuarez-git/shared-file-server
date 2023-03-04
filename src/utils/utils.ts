import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from '../config/config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.body.tokenData = decoded;
        next();
    });
}

export const generateUID = () => {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
