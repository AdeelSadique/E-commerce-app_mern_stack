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

// app.use(
//   cors({
//     credentials: true,
//     origin: 'https://e-commerce-app-mern-stack-47dv-b8o5rrui6-adeelsadiques-projects.vercel.app',
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.use('/api', product);
app.use('/api', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use(errorMiddleware);

module.exports = app;
