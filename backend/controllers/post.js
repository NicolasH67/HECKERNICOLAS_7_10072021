const db = require('../models'); 
const Message = db.Message
const Comment = db.Comment
const fs = require('fs')

exports.create = async (req, res, next) => {
    if (req.file === undefined || null) {
        const newMessage = await Message.create({
            UserId: req.body.idUSERS,
            content: req.body.content, 
            picture: null, 
            like: 0, 
            dislike: 0
        })
        .then(function(newMessage) {
            console.log(newMessage)
            return res.status(200).json("Post create")
        })
        .catch(function(error) {
            console.log(error)
            return res.status(400).send({ error })
        });
    } else {
        const newMessage = await Message.create({
            UserId: req.body.idUSERS,
            content: req.body.content, 
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
            like: 0, 
            dislike: 0
        })
        .then(function(newMessage) {
            console.log(newMessage)
            return res.status(200).json("Post create")
        })
        .catch(function(error) {
            console.log(error)
            return res.status(400).send({ error })
        });
    }
};

exports.getAllMessages = async (req, res, next) => {
    await Message.findAll({ order: [['updatedAt', 'DESC']]})
    .then((Message) => {
        console.log(Message)
        res.status(200).json(Message)
    })
    .catch((error) => {
        console.log( error )
        res.status(404).json({ error })
    })
}

exports.findOneMessage = async (req, res, next) => {
    const idMessage = req.params.id;
    console.log(idMessage)
    await db.Message.findOne({ where: { id: idMessage } })
    .then((Message) => {
      console.log(Message)
      res.status(200).json(Message)
    })
    .catch((error) => {
      console.log( error )
      res.status(404).json({ error })
    })
}

exports.findToUser = async (req, res, next) => {
    const UserId = req.params.id;
    console.log(UserId)
    await db.Message.findAll({ where: { UserId: UserId }, order: [['updatedAt', 'DESC']] })
    .then((Message) => {
      console.log(Message)
      res.status(200).json(Message)
    })
    .catch((error) => {
      console.log( error )
      res.status(404).json({ error })
    })
}

exports.deleteMessage = async (req, res, next) => {
    try {
      const post = await Message.findOne({
        where: {id: req.params.id}
      });
      if (post === null) {
        console.log(error)
        return res.status(404).send({ error })
      } else {
        if (post.picture === null || undefined) {
            Message.destroy(
            {
              where: {id: req.params.id}
            })
            .then(function() {
              console.log('Post is delete')
              return res.status(200).json("Post is delete")
            })
            .catch(function(error) {
              console.log(error)
              return res.status(400).send({ error })
            })
            Comment.destroy(
              {
                where: {MessageId: req.params.id}
              })
              .then(function() {
                console.log('Comment is delete')
              })
              .catch(function(error) {
                console.log(error)
                return res.status(400).send({ error })
              })
        } else {
          const filename = post.picture.split('/images/')[1]; 
          fs.unlink(`images/${filename}`, () => {
            Message.destroy(
            {
              where: {id: req.params.id}
            })
            .then(function() {
                console.log("Post is delete")
              return res.status(200).json("user is delete")
            })
            .catch(function(error) {
              return res.status(400).send({ error })
            })
            Comment.destroy(
              {
                where: {MessageId: req.params.id}
              })
              .then(function() {
                console.log('Comment is delete')
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