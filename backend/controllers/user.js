const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const JWT = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email } 
        }); 
        if (user !== null) {
            return res.status(400).send({ error: "email déjà utiliser" });
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
            return res.status(201).send({ error: "utilisateur créer" });
        }
    } catch (error) {
        res.statuts(400).send({ error: "email déjà utilisé" })
    }
    next()
}; 

exports.login = async (req, res, next) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      });
      if (user === null) {
        return res.status(404).send({ error: "Connexion échouée" });
      } else {
        const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
        if (!hash) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
          return res.status(200).send({
            userId: user._id,
            token: JWT.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  };