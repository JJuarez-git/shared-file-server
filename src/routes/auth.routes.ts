import { Router } from "express";
import {
    getToken,
    generateToken,
    createUser
} from "../controllers/auth.controller";
const router = Router();

router.get("/token/:email", getToken);
router.post("/token", generateToken);
router.post("/signup", createUser);

export default router;
