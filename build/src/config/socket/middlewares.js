"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketMiddlewares = (io) => {
    io.use((socket, next) => {
        if (socket.connected) {
            console.log("[SOCKETITO]", socket.id);
        }
        next();
    });
};
exports.default = socketMiddlewares;
