"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderFromWorkspace = exports.createFolderIntoWorkspace = exports.getWorkspace = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const client_1 = require("@prisma/client");
const utils_1 = require("../utils/utils");
const client_s3_1 = require("@aws-sdk/client-s3");
const prisma = new client_1.PrismaClient();
const getWorkspace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* const command = new ListObjectsCommand({
            Bucket: AWS_BUCKET_NAME,
            
        })
        

 */
        const command = new client_s3_1.GetObjectCommand({
            Bucket: config_1.AWS_BUCKET_NAME,
            Key: 'workspaces/code.png'
        });
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
        fs.readdir(config_1.WORKSPACE_URL + workspace, (err, files) => {
            if (err) {
                console.error(err.message);
                res.status(404).json({ message: "Workspace not found." });
                return;
            }
            const workspace_files = files.map(file => {
                let fileDetails = fs.lstatSync(path_1.default.resolve(config_1.WORKSPACE_URL + workspace + '\\', file));
                return {
                    name: file,
                    isFile: fileDetails.isFile(),
                    isFolder: fileDetails.isDirectory(),
                    extension: file.split('.')[1],
                    details: fileDetails
                };
            });
            res.status(200).json(workspace_files);
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.getWorkspace = getWorkspace;
const createFolderIntoWorkspace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workspace } = req.params;
        const { folder_name } = req.body;
        const folder = yield prisma.folder.create({
            data: { id: (0, utils_1.generateUID)(), name: folder_name, parent: '', url: '' }
        });
        const ROUTE = path_1.default.resolve(config_1.WORKSPACE_URL + workspace + '\\' + folder.id);
        fs.mkdir(ROUTE, (err) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ message: "Folder can not be created.", created: false });
                return;
            }
            res.status(200).json({ message: `Folder '${folder_name}' created.`, created: true });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.createFolderIntoWorkspace = createFolderIntoWorkspace;
const deleteFolderFromWorkspace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // HACER RELACION UID CON NOMBRE CARPETA Y GUARGAR CARPETAS CON UID EN WORKSPACE
        const { workspace } = req.params;
        const { folder_name } = req.body;
        const ROUTE = path_1.default.resolve(config_1.WORKSPACE_URL + workspace + '\\' + folder_name);
        fs.rmdir(ROUTE, (err) => {
            if (err) {
                console.error(err.message);
                res.status(400).json({ message: "Folder can not be deleted.", deleted: false });
                return;
            }
            res.status(200).json({ message: `Folder '${folder_name}' deleted.`, deleted: true });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.deleteFolderFromWorkspace = deleteFolderFromWorkspace;
