const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const JWT = require('jsonwebtoken'); 
const fs = require('fs'); 
const multer = require('multer');

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
    db.User.findOne({
      id: req.params.id,
    })
    .then((User) => {
      res.status(200).json(User)
      console.log(User)
    })
    .catch((error) => {
      res.status(404).json({
        error: error, 
      })
    })
  };

  exports.update = async (req, res, next) => {
    try {
      const user = await db.User.findOne({
          where: { id: req.params.id } 
      }); 
      if (user === null) {
          return res.status(404).send({ error: "Vous n'etes pas connecter" });
      } else {
        console.log(req.file)
        if (req.file === undefined || null) {
          const updateUser = await db.User.update(
            {
              name: req.body.name, 
              lastname: req.body.lastname, 
              bio: req.body.bio,
            },
            {
              where: {id: req.params.id}
            })
            .then(function(User) {
              return res.status(200).json(User)
            })
            .catch(function(error) {
              console.log(error);
              return res.status(400).send({ error });
            })
        } else {
          if (user.picture === "http://localhost:3066/images/icone-default.jpeg" ) {
            console.log('ne pas delete')
          } else {
            db.User.findOne({
              id: req.params.id,
            })
            .then(user => {
              const filename = user.picture.split('/images/')[1]; 
              fs.unlink(`images/${filename}`, ()=> {
                const updateUser = db.User.update(
                  {
                    name: req.body.name, 
                    lastname: req.body.lastname, 
                    bio: req.body.bio,
                    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                  },
                  {
                    where: {id: req.params.id}
                  })
                  .then(function(User) {
                    return res.status(200).json(User)
                  })
                  .catch(function(error) {
                    console.log(error);
                    return res.status(400).send({ error });
                  })
              })
            })
          }
        } 
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({ error });
    }
  }