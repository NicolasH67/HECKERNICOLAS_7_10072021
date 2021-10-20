const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const JWT = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email } 
        }); 
        if (user !== null) {
          console.log("l'utilisateur existe")
        } else {
            const hash = await bcrypt.hash(req.body.password, 10); 
            const newUser = await db.User.create({
                email: req.body.email, 
                name: req.body.name, 
                lastname: req.body.lastname, 
                bio: "",
                picture: "http://localhost:3066/images/icone-default.jpeg", 
                password: hash, 
                isAdmin: false, 
            }); 
            console.log(newUser)
        }
    } catch (error) {
        res.statuts(400).send({ error: "email déjà utilisé" })
    }
}; 

