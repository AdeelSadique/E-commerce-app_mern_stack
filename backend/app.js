// import express from 'express';
const express = require('express');
const product = require('./routes/product');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use('/api', product);
app.use(errorMiddleware);

module.exports = app;
