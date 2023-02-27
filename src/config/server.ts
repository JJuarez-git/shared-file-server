import express from "express";
import http from "http";
import socketIO from "socket.io";
import cors from "cors";
import morgan from "morgan";
import * as actions from "./socket/actions";
import socketMiddlewares from './socket/middlewares';
import { instrument } from "@socket.io/admin-ui";
import { PORT } from './config';
const routes = require("../routes/index.routes");
const setActions = require("../config/socket/actions");

export default class Server {
  private app: express.Application;
  private port = PORT;
  private httpServer: http.Server;
  private io: socketIO.Server;

  constructor() {
    this.app = express();
    this.httpServer = new http.Server(this.app);
    this.io = require("socket.io")(this.httpServer, {
      cors: { credentials: true },
    });

    //API
    this.config();
    routes(this.app);

    //SOCKETS
    this.actions();
    instrument(this.io, { auth: false })
    //socketMiddlewares(this.io)
  }

  private config() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  private actions() {
    this.io.on("connection", (client) => setActions(client, this.io));
  }

  start() {
    this.httpServer.listen(this.port, () =>
      console.log(
        new Date().toLocaleTimeString(),
        "[SERVER]: Running on localhost at port",
        this.port
      )
    );
  }
}
