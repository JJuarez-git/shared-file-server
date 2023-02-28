"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const router = (0, express_1.Router)();
router.post("/create", orders_controller_1.create);
router.get("/capture", orders_controller_1.capture);
router.get("/cancel", orders_controller_1.cancel);
exports.default = router;
