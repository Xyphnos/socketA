'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

const users = {};

io.on('connection', (socket) => {

    socket.on('new-user', (name) => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
        console.log('new user: ', name);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });

    socket.on('chat-message', (message) => {
        socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]});
    });
});

http.listen(3000, () => {
    console.log('listening on port 3000');
});