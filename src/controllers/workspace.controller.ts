import * as fs from 'fs';
import path from "path";
import { Request, Response } from "express";
import { WORKSPACE_URL } from "../config/config";
import { PrismaClient } from '@prisma/client';
import { generateUID } from '../utils/utils';
const prisma = new PrismaClient();

export const getWorkspace = (req: Request, res: Response) => {
    try {
        const { workspace } = req.params;
        fs.readdir(WORKSPACE_URL + workspace, (err, files) => {
            if (err) {
                console.error(err.message);
                res.status(404).json({ message: "Workspace not found." });
                return;
            }
            const workspace_files = files.map(file => {
                let fileDetails = fs.lstatSync(path.resolve(WORKSPACE_URL + workspace + '\\', file))
                return {
                    name: file,
                    isFile: fileDetails.isFile(),
                    isFolder: fileDetails.isDirectory(),
                    extension: file.split('.')[1],
                    details: fileDetails
                }
            })
            res.json(workspace_files);
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const createFolderIntoWorkspace = async (req: Request, res: Response) => {
    try {
        const { workspace } = req.params;
        const { folder_name } = req.body;
        
        const folder = await prisma.folder.create({
            data: { id: generateUID(), name: folder_name as string, parent: '', url: '' }
        })
        
        const ROUTE = path.resolve(WORKSPACE_URL + workspace + '\\' + folder.id);

        fs.mkdir(ROUTE, (err) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ message: "Folder can not be created.", created: false });
                return;
            }
            res.status(200).json({ message: `Folder '${folder_name}' created.`, created: true });
        })

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const deleteFolderFromWorkspace = async (req: Request, res: Response) => {
    try {

        // HACER RELACION UID CON NOMBRE CARPETA Y GUARGAR CARPETAS CON UID EN WORKSPACE

        const { workspace } = req.params;
        const { folder_name } = req.body;
        const ROUTE = path.resolve(WORKSPACE_URL + workspace + '\\' + folder_name)

        fs.rmdir(ROUTE, (err) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ message: "Folder can not be deleted.", deleted: false });
                return;
            }
            res.status(200).json({ message: `Folder '${folder_name}' deleted.`, deleted: true });
        })

    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
}