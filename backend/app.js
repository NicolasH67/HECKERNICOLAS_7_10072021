const express = require('express');
const helmet = require('helmet');
require('dotenv').config;
const Sequelize = require('sequelize');
const bodyParser = require('body-parser')

const userRoutes = require('./routes/user');

const app = express(); 

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect : "sqlite", 
        port: process.env.DB_PORT
    }
)
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(helmet()); 
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
})

app.use("/api/auth", userRoutes); 

module.exports = app; 