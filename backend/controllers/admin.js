const bcrypt = require('bcrypt')
const db = require('../models'); 
const Message = db.Message
const Comment = db.Comment
const User = db.User


exports.findAllUser = async (req, res, next) => {
    await User.findAll({ order: [['id', 'DESC']]})
    .then((Users) => {
        console.log(Users)
        res.status(200).json(Users)
    })
    .catch((error) => {
        console.log( error )
        res.status(404).json({ error })
    })
};

exports.findAllComment = async (req, res, next) => {
    await Comment.findAll({ order: [['MessageId', 'DESC']]})
    .then((Users) => {
        console.log(Users)
        res.status(200).json(Users)
    })
    .catch((error) => {
        console.log( error )
        res.status(404).json({ error })
    })
};

exports.changePassword = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.update(
        {
            password: hash
        }, 
        {
            where: {id: req.params.id}
        }
    )
    .then(function(User) {
        return res.status(200).json(User)
    })
    .catch(function(error) {
        console.log(error); 
        return res.status(404).send({ error })
    })
}

exports.countUsers = async (req, res, next) => {
    await User.count({})
    .then((Users) => {
        console.log(Users)
        res.status(200).json(Users)
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({ error })
    })
}

exports.countMessages = async (req, res, next) => {
    await Message.count({})
    .then((Message) => {
        console.log(Message)
        res.status(200).json(Message)
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({ error })
    })
}

exports.countComment = async (req, res, next) => {
    const idMessage = req.params.id
    await Comment.count({ where: { messageId: idMessage }})
    .then((Comments) => {
      console.log(Comments)
      res.status(200).json(Comments)
    })
    .catch((error) => {
      console.log( error )
      res.status(404).json({ error })
    })
}

exports.deleteComment = async (req, res, next) => {
    Comment.destroy({
          where: {id: req.params.id}
    })
    .then(function() {
        console.log('Comment is delete')
        return res.status(200).json("Comment is delete")
    })
    .catch(function(error) {
        console.log(error)
        return res.status(400).send({ error })
    })
}