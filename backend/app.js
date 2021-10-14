// framework 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors')

// route 
const userRoutes = require('./routes/user'); 

// Connexion à la DB 
const { sequelize } = require('./models/index'); 

// application express. 

const app = express(); 

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use('/api/auth', userRoutes); 

const dbConnect = async function () {
    try {
        await sequelize.authenticate(); 
        console.log('Connection has been established succesfully')
    } catch (error) {
        console.error('unable to conect to the database', error )
    }
}; 
dbConnect(); 

module.exports = app; 