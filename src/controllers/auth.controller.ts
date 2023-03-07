import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import path from "path";
import { JWT_SECRET, WORKSPACE_URL } from "../config/config";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const generateToken = async (req: Request, res: Response) => {
    try {
        const expiration = 21600; // 6 horas en segundos
        const { username, email } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' })
            return;
        }
        if (!email) {
            res.status(400).json({ message: 'No email provided.' })
            return;
        }
        const token = jwt.sign({ username, email }, JWT_SECRET/* , { expiresIn: expiration } */);
        await prisma.user.update({
            where: { email },
            data: { token }
        });
        res.status(200).json({ token, username, email/* expiresIn: new Date(Date.now() + (expiration * 1000)), */ });

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const getToken = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({ message: 'No email provided.' })
            return;
        }

        const result = await prisma.user.findUnique({
            where: { email },
            select: { token: true, email: true, username: true }
        })
        if (!result) {
            res.status(400).json({ message: 'Email is incorrect.' })
            return;
        }
        res.status(200).json(result);

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' })
            return;
        }
        if (!email) {
            res.status(400).json({ message: 'No email provided.' })
            return;
        }
        /* const ROUTE = path.resolve(WORKSPACE_URL + '\\' + username);
        fs.mkdir(ROUTE, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ message: "Workspace folder can not be created." });
                return;
            }
        }) */
        const result = await prisma.user.create({
            data: { username, email }
        })
        res.status(200).json(result);

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}

