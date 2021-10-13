const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const fs = require('fs'); 
const { Op } = require('sequelize'); 
const token = require('../middleware/token'); 

exports.signup = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email } 
        }); 
        if (user !== null) {
          console.log("l'utilisateur existe")
        } else {
            console.log(req.body.name, req.body.lastname, req.body.email, req.body.password)
            const hash = await bcrypt.hash(req.body.password, 10); 
            console.log(hash)
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
            return res.status(201).send({ message: "utilisateur créer" })
        }
    } catch (error) {
        return res.statuts(400).send({ error: "email déjà utilisé" })
    }
}; 

exports.login = async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      }); // on vérifie que l'adresse mail figure bien dan la bdd
      if (user === null) {
        return res.status(403).send({ error: "Connexion échouée" });
      } else {
        const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
        if (!hash) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
          const tokenObject = await token.issueJWT(user);
          res.status(200).send({
            // on renvoie le user et le token
            user: user,
            token: tokenObject.token,
            sub: tokenObject.sub,
            expires: tokenObject.expiresIn,
            isAdmin: isAdmin
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };
