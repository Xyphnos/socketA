'use strict';

const roomModel = require('../models/roomModel');
const rooms = {};

const room_create = (req, res) =>{
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
};

const room_get_all = (req, res) => {
  res.render('index', {rooms: rooms});
};

const room_get_specified = (req, res) => {
  res.render('room', { roomName: req.body.room})
};

const get_user_rooms = (socket) => {
  return Object.entries(rooms).reduce((names, [name, room]) =>{
    if (room.users[socket.id] != null){
      names.push(name);
      return names
    }
  }, [])
};

const rest = (socket) => {

    socket.on('new-user', (room, name) => {
      console.log(rooms[room]);
      socket.join(room);
      rooms[room].users[socket.id] = name;
      socket.to(room).broadcast.emit('user-connected', name);
      console.log('new user: ', name);
    });

    socket.on('chat-message', (room, message) => {
      socket.to(room).broadcast.emit('chat-message',{
        message: message,
        name: rooms[room]
            .users[socket.id]
      });
    });
    socket.on('disconnect', () => {
      get_user_rooms(socket).forEach(room => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete rooms[room].users[socket.id];
      });
    });
  };

module.exports = {
  room_create,
  room_get_specified,
  room_get_all,
  //rest
};
