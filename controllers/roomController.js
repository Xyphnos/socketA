'use strict';

const roomModel = require('../models/roomModel');

const rooms = {};

const room_create = async (req, res) =>{
  const data = req.body.room;
  rooms[data] = { users: {} };
  res.redirect(data);
};

const room_get_all = (req, res) => {
  res.render('index', {rooms: rooms});
};

const room_get_specified = (req, res) => {
  res.render('room', { roomName: req.body.room})
};

module.exports = {
  room_create,
  room_get_specified,
  room_get_all
};
