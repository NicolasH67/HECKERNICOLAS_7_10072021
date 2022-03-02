const db = require('../models'); 

exports.create = async (req, res, next) => {
    console.log(req.body)
    try {
        const newPost = await db.Message.create({
            idUSERS: req.body.idUSERS,
            content: req.body.content, 
            like: "0",
            dislike: "0"
        })
        console.log(newPost)
        return res.status(201).send({ error: "Message Poster" });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error });
    }
}; 

exports.findOneMessage = (req, res, next) => {
    db.Message.findOne({
      id: req.params.id,
    })
    .then((message) => {
      return res.status(200).json(message)
    })
    .catch((error) => {
        return res.status(404).json({
          error: error,
        })
    })
};

exports.getAllMessage = (req, res, next) => {
    db.Message.find()
    .then((messages) => {
        return res.status(200).json(messages)
    })
    .catch((error) => {
        return res.status(500).json({
            error: error,
        })
    })
}

exports.AllMessageToUser = (req, res, next) => {
    db.Message.find({
        where: {idUSERS: req.params.id}
    })
    .then((messages) => {
        return res.status(200).json(messages)
    })
    .catch((error) => {
        return res.status(404).json({error: error,})
    })
}
