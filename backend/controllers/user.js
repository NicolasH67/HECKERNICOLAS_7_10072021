const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const JWT = require('jsonwebtoken'); 
const fs = require('fs'); 
const User = db.User
const Message = db.Message
const Comment = db.Comment

exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email } 
        }); 
        if (user !== null) {
            return res.status(400).send({ error: "email déjà utiliser" });
        } else {
            const hash = await bcrypt.hash(req.body.password, 10); 
            const newUser = await User.create({
                email: req.body.email, 
                name: req.body.name, 
                lastname: req.body.lastname, 
                bio: "",
                picture: "http://localhost:3066/images/icone-default.jpeg", 
                password: hash, 
                isAdmin: false, 
            });
            return res.status(201).send({ message: "utilisateur créer" });
        }
    } catch (error) {
        res.statuts(400).send({ error: "email déjà utilisé" })
    }
    next()
}; 

exports.login = async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (user === null) {
        return res.status(404).send({ error: "Connexion échouée" });
      } else {
        const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
        if (!hash) {
          return res.status(401).send({ error: "Mot de passe incorrect !" });
        } else {
          console.log(user)
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

exports.findOneUser = async (req, res, next) => {
  const userId = req.params.id;
  await User.findOne({ where: { id: userId } })
  .then((User) => {
    console.log(userId ,User)
    res.status(200).json(User)
  })
  .catch((error) => {
    console.log( error )
    res.status(404).json({ error })
  })
}

  exports.update = async (req, res, next) => {
    try {
      const user = await User.findOne({
          where: { id: req.params.id } 
      }); 
      if (user === null) {
          return res.status(404).send({ error: "Vous n'etes pas connecter" });
      } else {
        console.log(req.file)
        if (req.file === undefined || null) {
          const updateUser = await User.update(
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
            const updateUser = User.update(
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
          } else {
            User.findOne({
              id: req.params.id,
            })
            .then(user => {
              const filename = user.picture.split('/images/')[1]; 
              fs.unlink(`images/${filename}`, ()=> {
                const updateUser = User.update(
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

  exports.delete = async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {id: req.params.id}
      });
      if (user === null) {
        console.log(error)
        return res.status(404).send({ error })
      } else {
        if (user.picture === "http://localhost:3066/images/icone-default.jpeg") {
            User.destroy(
            {
              where: {id: req.params.id}
            })
            .then(function() {
              console.log('user is delete')
              return res.status(200).json("user is delete")
            })
            .catch(function(error) {
              console.log(error)
              return res.status(400).send({ error })
            })
            const messages = Message.findAll(
            {
              where: {UserID: req.params.id}
            })
            Message.destroy(
            {
              where: {UserID: req.params.id}
            })
            .then(function() {
              console.log('post is delete')
              return res.status(200).json("post is delete")
            })
            .catch(function(error) {
              console.log(error)
              return res.status(400).send({ error })
            })
            Comment.destroy(
              {
                where: {UserID: req.params.id}
              }
            )
            .then(function() {
              console.log('comment is delete')
              return res.status(200).json("comment is delete")
            })
            .catch(function(error) {
              console.log(error)
              return res.status(400).send({ error })
            })
        } else {
          const filename = user.picture.split('/images/')[1]; 
          fs.unlink(`images/${filename}`, () => {
            User.destroy(
            {
              where: {id: req.params.id}
            })
            .then(function() {
              return res.status(200).json("user is delete")
            })
            .catch(function(error) {
              return res.status(400).send({ error })
            })
            Message.destroy(
              {
                where: {UserID: req.params.id}
              })
              .then(function() {
                console.log('post is delete')
                return res.status(200).json("post is delete")
              })
              .catch(function(error) {
                console.log(error)
                return res.status(400).send({ error })
              })
              Comment.destroy(
                {
                  where: {UserID: req.params.id}
                }
              )
              .then(function() {
                console.log('comment is delete')
                return res.status(200).json("comment is delete")
              })
              .catch(function(error) {
                console.log(error)
                return res.status(400).send({ error })
              })
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }