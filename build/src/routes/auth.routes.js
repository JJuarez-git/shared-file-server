"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/token/:email", auth_controller_1.getToken);
router.post("/token", auth_controller_1.generateToken);
router.post("/signup", auth_controller_1.createUser);
exports.default = router;
