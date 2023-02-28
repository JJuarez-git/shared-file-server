"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUID = void 0;
const generateUID = () => {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
exports.generateUID = generateUID;
