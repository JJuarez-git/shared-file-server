"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection = (client) => {
    console.log(new Date().toLocaleTimeString(), "[SOCKET CLIENT CONNECTED]:", client.id);
};
const disconnect = (client) => {
    client.on("disconnect", () => {
        console.log(new Date().toLocaleTimeString(), "[SOCKET CLIENT DISCONNECTED]:", client.id);
    });
};
const changeStatus = (client, io) => {
    client.on("change-status", (payload) => {
        console.log(new Date().toLocaleTimeString(), "[SOCKET]:", "CHANGE STATUS", { payload });
        io.emit("change-status-emit", payload);
    });
};
const addFolder = (client, io) => {
    client.on("add-folder", (payload) => {
        console.log(new Date().toLocaleTimeString(), "[SOCKET]:", "ADD FOLDER", payload);
        io.emit("add-folder-emit", payload);
    });
};
module.exports = (client, io) => {
    connection(client);
    disconnect(client);
    changeStatus(client, io);
    addFolder(client, io);
};
