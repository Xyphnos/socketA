'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const roomRoute = require('./routes/roomRoute');
const path = require('path')

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static(path.join(__dirname, "public")));

const users = {};

app.use('/', roomRoute);

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