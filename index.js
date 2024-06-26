const app = require('express');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: true,
    origins: ["*"]
});

const { createGame } = require('./util/words')

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on('startGame', ({gameId}) => {
        createGame().then(words => {
            io.to(gameId).emit('startGame', words);
        })
    })

    socket.on('gameUpdate', ({gameId, words}) => {
        io.to(gameId).emit(gameId, words)
    })

    socket.on('joinGame', ({gameId}) => {
        socket.join(gameId);
        socket.to(gameId).emit('joinGame', 'A player joined the game!');
    })

    socket.on('stopGame', ({gameId}) => {
        io.to(gameId).emit('stopGame')
    })
})

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log("Server is Running on port " + PORT))