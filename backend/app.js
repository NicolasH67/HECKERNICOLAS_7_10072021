// framework 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 
const path = require('path')

// route 
const userRoutes = require('./routes/user'); 
//const postRoutes = require('./routes/post')

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
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// application express. 

const app = express(); 

app.use(cors(corsOptions));

app.use(helmet());

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/api/auth', userRoutes); 

module.exports = app; 