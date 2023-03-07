"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expiration = 21600; // 6 horas en segundos
        const { username, email } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' });
            return;
        }
        if (!email) {
            res.status(400).json({ message: 'No email provided.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ username, email }, config_1.JWT_SECRET /* , { expiresIn: expiration } */);
        yield prisma.user.update({
            where: { email },
            data: { token }
        });
        res.status(200).json({ token, username, email /* expiresIn: new Date(Date.now() + (expiration * 1000)), */ });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.generateToken = generateToken;
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        if (!email) {
            res.status(400).json({ message: 'No email provided.' });
            return;
        }
        const result = yield prisma.user.findUnique({
            where: { email },
            select: { token: true, email: true, username: true }
        });
        if (!result) {
            res.status(400).json({ message: 'Email is incorrect.' });
            return;
        }
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getToken = getToken;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' });
            return;
        }
        if (!email) {
            res.status(400).json({ message: 'No email provided.' });
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
        const result = yield prisma.user.create({
            data: { username, email }
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.createUser = createUser;
