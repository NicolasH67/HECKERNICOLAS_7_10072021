const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const JWT = require('jsonwebtoken'); 
const fs = require('fs'); 

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
          console.log(user.id)
          return res.status(200).send({
            userId: user.id,
            token: JWT.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  }

  exports.findOneUser = (req, res, next) => {
    console.log(req.params.id)
    db.User.findOne({
      id: req.params.id,
    })
    .then((User) => {
      res.status(200).json(User)
    })
    .catch((error) => {
      res.status(404).json({
        error: error, 
      })
    })
  };

  exports.update = (req, res, next) => {
    db.User.findOne({
      id: req.params.id,
    })
    .then((User) => {
      if(req.body.picture !== null) {
        if(User.picture === "http://localhost:3066/images/icone-default.jpeg") {
          newPicture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
          console.log(newPicture);
          User.picture = newPicture;
          } else {
            const filename = User.picture.split("/images")[1]
            fs.unlink(`images/${filename}`, (err) => {
              if (err) console.log(err);
              else {
                console.log(`Deleted file: upload/${filename}`);
              }
            });
            newPicture = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
            console.log(newPicture);
            User.picture = newPicture;
          }
        } else {
          console.log("no change")
        }
      if(req.body.name !== User.name) {
        User.name = req.body.name
      } else {
        console.log("no change")
      }
      if(req.body.lastname !== User.lastname) {
        User.lastname = req.body.lastname
      } else {
        console.log("no change")
      }
      if(req.body.bio !== User.bio) {
        User.name = req.body.bio
      } else {
        console.log("no change")
      }
    })
    .catch((error) => {
      return res.status(500).send({ error: "Erreur serveur" });
    })
  }