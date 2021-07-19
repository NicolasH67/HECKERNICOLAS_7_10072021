const express = require('express')
const helmet = require('helmet')
require('dotenv').config;

const userRoutes = require('./routes/user')

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