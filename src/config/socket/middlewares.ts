import socketIO from 'socket.io';

const socketMiddlewares = (io: socketIO.Server) => {
    io.use((socket, next) => {
        if (socket.connected) {
            console.log("[SOCKETITO]", socket.id);
        }
        next()
    })
}

export default socketMiddlewares