'use strict';

const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.get('/', roomController.room_get_all);

router.get('/:room', roomController.room_get_specified);

router.post('/room', roomController.room_create);


module.exports = router;
