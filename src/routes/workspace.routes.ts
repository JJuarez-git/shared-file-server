import { Router } from "express";
import {
    getWorkspace,
    createFolderIntoWorkspace,
    deleteFolderFromWorkspace
} from "../controllers/workspace.controller";
const router = Router();

router.get("/:workspace", getWorkspace);
router.post("/:workspace", createFolderIntoWorkspace);
router.delete("/:workspace", deleteFolderFromWorkspace);

export default router;
