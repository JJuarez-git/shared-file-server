import socketIO from "socket.io";

const connection = (client: socketIO.Socket) => {
  console.log(
    new Date().toLocaleTimeString(),
    "[SOCKET CLIENT CONNECTED]:",
    client.id
  );
};

const disconnect = (client: socketIO.Socket) => {
  client.on("disconnect", () => {
    console.log(
      new Date().toLocaleTimeString(),
      "[SOCKET CLIENT DISCONNECTED]:",
      client.id
    );
  });
};

const changeStatus = (client: socketIO.Socket, io: socketIO.Server) => {
  client.on("change-status", (payload: { available: number }) => {
    console.log(new Date().toLocaleTimeString(), "[SOCKET]:",  "CHANGE STATUS", { payload });
    io.emit("change-status-emit", payload);
  });
};

const addFolder = (client: socketIO.Socket, io: socketIO.Server) => {
  client.on("add-folder", (payload: any) => {
    console.log(new Date().toLocaleTimeString(), "[SOCKET]:",  "ADD FOLDER", payload);
    io.emit("add-folder-emit", payload);
  });
};

module.exports = (client: socketIO.Socket, io: socketIO.Server) => {
  connection(client);
  disconnect(client);
  changeStatus(client, io);
  addFolder(client, io);
}