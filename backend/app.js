// framework 
const express = require('express'); 
const helmet = require('helmet'); 
const cors = require('cors'); 
const path = require('path')

// route 
const userRoutes = require('./routes/user'); 
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/Comments');
const adminRoutes = require('./routes/admin')

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
    optionsSuccessStatus: 200
  }

// application express. 

const app = express(); 

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use('/api/auth', userRoutes); 
app.use('/api/post', postRoutes); 
app.use('/api/comment', commentRoutes); 
app.use('/api/admin', adminRoutes); 
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app; 