"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workspace_routes_1 = __importDefault(require("./workspace.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const config_1 = require("../config/config");
var ROUTES;
(function (ROUTES) {
    ROUTES["INDEX"] = "/index";
    ROUTES["AUTH"] = "/auth";
    ROUTES["WORKSPACE"] = "/workspace";
})(ROUTES || (ROUTES = {}));
module.exports = (app) => {
    app.use(`${config_1.API_URI}${ROUTES.INDEX}`, (req, res) => res.status(200).json({ message: "index" }));
    app.use(`${config_1.API_URI}${ROUTES.AUTH}`, auth_routes_1.default);
    app.use(`${config_1.API_URI}${ROUTES.WORKSPACE}`, workspace_routes_1.default);
};
