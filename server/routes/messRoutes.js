const express = require('express');
const { protect } = require('../controller/authentication');
const { getMess, addMess } = require('../controller/message');

const messRouter = express.Router();

messRouter.route('/').get(protect, getMess).post(protect, addMess);

module.exports = messRouter;