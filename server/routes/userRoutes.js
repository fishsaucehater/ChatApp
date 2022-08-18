const express = require('express');
const { protect } = require('../controller/authentication');
const { getUser } = require('../controller/user');

const userRouter = express.Router();

userRouter.route('/').get(protect, getUser);

module.exports = userRouter;