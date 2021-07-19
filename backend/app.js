import express from 'express';
import helmet from 'helmet';
require('dotenv').config;

import userRoutes from './routes/user';

const app = express(); 

app.use(helmet()); 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})

app.use("/api/auth", userRoutes); 

module.exports = app; 