// framework 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors')

// route 
const userRoutes = require('./routes/user'); 

// Connexion à la DB 
const { sequelize } = require('./models/index'); 

const dbConnect = async function () {
    try {
        await sequelize.authenticate(); 
        console.log('Connection has been established succesfully')
    } catch (error) {
        console.error('unable to conect to the database', error )
    }
}; 
dbConnect(); 

const corsOptions = {
    origin: 'http://192.168.1.15:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// application express. 

const app = express(); 

app.use(cors(corsOptions));

app.use(helmet());

app.use(express.json());

app.use('/api/auth', userRoutes); 


module.exports = app; 