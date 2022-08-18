const express = require('express');
const { signup, login, makeNewToken } = require('../controller/authentication');
const authRouter = express.Router();

authRouter.route('/login').post(login);
authRouter.route('/signup').post(signup);
authRouter.route('/refresh').get(makeNewToken);

module.exports = authRouter;
