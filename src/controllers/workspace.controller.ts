import * as fs from 'fs';
import path from "path";
import { Request, Response } from "express";
import { AWS_BUCKET_NAME, WORKSPACE_URL } from "../config/config";
import { PrismaClient } from '@prisma/client';
import { generateUID } from '../utils/utils';
import { ListObjectsCommand, GetObjectAttributesCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { AWS_S3 } from '../config/aws-s3';
const prisma = new PrismaClient();

export const getWorkspace = async (req: Request, res: Response) => {
    try {
        /* const command = new ListObjectsCommand({
            Bucket: AWS_BUCKET_NAME,
            
        })
        

 */

        const command = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: 'workspaces/code.png'
        })
        /* const com = new GetObjectAttributesCommand({
            Bucket: AWS_BUCKET_NAME, Key: 'workspaces/code.png', ObjectAttributes: [
                'ETag',
                'Checksum',
                'ObjectParts',
                'StorageClass',
                'ObjectSize'
            ]
        }) */

        /* const obj = await AWS_S3.send(command);
        res.status(200).json(true); */

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
            res.status(200).json(workspace_files);
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