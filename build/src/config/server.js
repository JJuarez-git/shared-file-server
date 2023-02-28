"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const admin_ui_1 = require("@socket.io/admin-ui");
const config_1 = require("./config");
const routes = require("../routes/index.routes");
const setActions = require("../config/socket/actions");
class Server {
    constructor() {
        this.port = config_1.PORT;
        this.app = (0, express_1.default)();
        this.httpServer = new http_1.default.Server(this.app);
        this.io = require("socket.io")(this.httpServer, {
            cors: { credentials: true },
        });
        //API
        this.config();
        routes(this.app);
        //SOCKETS
        this.actions();
        (0, admin_ui_1.instrument)(this.io, { auth: false });
        //socketMiddlewares(this.io)
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
    }
    actions() {
        this.io.on("connection", (client) => setActions(client, this.io));
    }
    start() {
        this.httpServer.listen(this.port, () => console.log(new Date().toLocaleTimeString(), "[SERVER]: Running on localhost at port", this.port));
    }
}
exports.default = Server;
