const db = require('../models'); 
const Message = db.Message

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
            idUSERS: req.body.idUSERS,
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
    await Message.findAll()
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