// import express from 'express';
const express = require('express');
const path = require('path');
const process = require('process');
const product = require('./routes/product');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/order');
const errorMiddleware = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
// app.use('/public', express.static(path.join(path.resolve(), 'public')));
// app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({ path: './config/config.env' });
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'Head', 'Options'],
  })
);
app.use('/api/products', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

// app.use('/api', product);

app.use('/api', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

app.use(errorMiddleware);

module.exports = app;
