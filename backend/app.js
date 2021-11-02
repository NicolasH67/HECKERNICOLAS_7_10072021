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

// application express. 

const app = express(); 

app.use(helmet());

app.use(cors({origin :true}));

app.use(express.json());

app.use('/api/auth', userRoutes); 


module.exports = app; 