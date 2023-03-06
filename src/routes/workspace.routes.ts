import { Router } from "express";
import { verifyToken } from '../utils/utils';
import {
    getWorkspace,
    createFolderIntoWorkspace,
    deleteFolderFromWorkspace
} from "../controllers/workspace.controller";
const router = Router();

router.get("/:workspace", verifyToken, getWorkspace);
router.post("/:workspace", verifyToken, createFolderIntoWorkspace);
router.delete("/:workspace", verifyToken, deleteFolderFromWorkspace);

export default router;
