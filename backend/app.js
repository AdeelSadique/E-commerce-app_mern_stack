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
    origin: [
      'https://e-commerce-app-mern-stack-47dv-66kfq9hj1-adeelsadiques-projects.vercel.app/',
      'https://e-commerce-app-mern-stackbackend-77torjnf8.vercel.app/',
    ],
  })
);
// app.use(
//   cors({
//     credentials: true,
//     origin: '*',
//   })
// );

//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
// res.setHeader(
//   'Access-Control-Allow-Headers',
//   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
// )
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', 'https://e-commerce-app-mern-stack-47dv-66kfq9hj1-adeelsadiques-projects.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );
// });

app.use('/api', product);
app.use('/api', userRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use(errorMiddleware);

module.exports = app;
