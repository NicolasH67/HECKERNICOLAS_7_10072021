const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const User = require('../models/User');

// function signup
exports.signup =(req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.hash
            }); 
            user.save()
                .then(() => res.status(201).json({ message: 'User created'}))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}