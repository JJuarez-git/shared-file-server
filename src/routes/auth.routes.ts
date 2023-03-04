import { Router } from "express";
import {
    token
} from "../controllers/auth.controller";
const router = Router();

router.post("/token", token);

export default router;
