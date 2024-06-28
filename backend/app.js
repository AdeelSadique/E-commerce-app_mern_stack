// import express from 'express';
const express = require('express');
const path = require('path');
const product = require('./routes/product');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/order');
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
// app.use(express.static(path.join(path.resolve(), 'public')));
app.use('./public', express.static(path.join(path.resolve(), './public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', '*'],
  })
);
app.use('/', product);
app.use('/', (req, res) => {
  res.json({ msg: 'starting page' });
});
app.use('/testing', (req, res) => {
  res.json({ msg: ' testing api page working' });
});
app.use('/', userRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);
app.use(errorMiddleware);

module.exports = app;
