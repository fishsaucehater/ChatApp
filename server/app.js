const express = require('express');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const messRouter = require('./routes/messRoutes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/mess', messRouter);

module.exports = app;
