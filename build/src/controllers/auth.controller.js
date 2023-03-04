"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const token = (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            res.status(400).json({ message: 'No username provided.' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ username }, config_1.JWT_SECRET);
        res.status(200).json({ token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
};
exports.token = token;
