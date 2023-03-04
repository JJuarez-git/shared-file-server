import { Router } from "express";
import { verifyToken } from '../utils/utils';
import {
    getWorkspace,
    createFolderIntoWorkspace,
    deleteFolderFromWorkspace
} from "../controllers/workspace.controller";
const router = Router();

router.get("/:workspace", verifyToken, getWorkspace);
router.post("/:workspace", createFolderIntoWorkspace);
router.delete("/:workspace", deleteFolderFromWorkspace);

export default router;
