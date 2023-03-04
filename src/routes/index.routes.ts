import express from 'express';
import workspaces from './workspace.routes';
import auth from './auth.routes';
import { API_URI } from '../config/config';

enum ROUTES {
    INDEX = "/index",
    AUTH = "/auth",
    WORKSPACE = "/workspace"
}

module.exports = (app: express.Application) => {
    app.use(`${API_URI}${ROUTES.INDEX}`, (req, res) => res.status(200).json({ message: "index" }))
    app.use(`${API_URI}${ROUTES.AUTH}`, auth)
    app.use(`${API_URI}${ROUTES.WORKSPACE}`, workspaces)
}