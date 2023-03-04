import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/config";

export const token = (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' })
            return;
        }
        const token = jwt.sign({ username }, JWT_SECRET);
        res.status(200).json({ token });

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}