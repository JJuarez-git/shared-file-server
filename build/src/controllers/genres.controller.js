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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenreById = exports.getAllGenres = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllGenres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.genres.findMany({
            orderBy: { name: "asc" },
        });
        res.json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getAllGenres = getAllGenres;
const getGenreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield prisma.genres.findUnique({
            where: { id: parseInt(id) },
        });
        if (result) {
            res.json(result);
        }
        else {
            res.status(404).json({ message: "Genre not found." });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getGenreById = getGenreById;
const createGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const result = yield prisma.genres.create({
            data: { name },
        });
        res.json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.createGenre = createGenre;
const updateGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = yield prisma.genres.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(404).json({ message: "Record to delete does not exist." });
    }
});
exports.updateGenre = updateGenre;
const deleteGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield prisma.genres.delete({
            where: { id: parseInt(id) },
        });
        res.json(result);
    }
    catch (err) {
        console.error(err.message);
        res.status(404).json({ message: "Record to delete does not exist." });
    }
});
exports.deleteGenre = deleteGenre;
