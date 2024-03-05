// import express from 'express';
const express = require('express');
const product = require('./routes/product');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/order');
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: '*' }));
app.use('/', product);
app.use('/', userRoutes);
app.use('/', cartRoutes);
app.use('/', orderRoutes);
app.use(errorMiddleware);

module.exports = app;
