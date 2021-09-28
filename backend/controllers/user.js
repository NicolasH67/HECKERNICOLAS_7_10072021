const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User')

// signup function
exports.signup = (req, res, next) => {
    console.log([req.body.name, req.body.lastname, req.body.email, req.body.password]);
    let user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        description: null, 
        picture: "http://localhost:3066/images/icone-default.jpeg", 
        admin: false
    })
    user.save()
    .then(() => res.status(201).json({ message: 'User created'}))
    .catch(error => res.status(400).json({ error }))
    .catch(error => res.status(500).json({ error }))
    next()
}

// login function
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'User not found'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.stauts(401).json({ error: 'Incorrect Password!' }); 
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
    next()
}