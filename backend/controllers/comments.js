const db = require('../models'); 
const Comments = db.Comment; 

exports.findByMessage = async (req, res, next) => {
    const idMessage = req.params.id;
    console.log(idMessage)
    await Comments.findAll({ where: { messageId: idMessage }, order: [['updatedAt', 'DESC']] })
    .then((Comments) => {
      console.log(Comments)
      res.status(200).json(Comments)
    })
    .catch((error) => {
      console.log( error )
      res.status(404).json({ error })
    })
}

exports.createComment = async (req, res, next) => {
  console.log(req.body.UserId)
  const newComment = await Comments.create({
    MessageId: req.body.MessageId,
    UserID: req.body.UserId,
    content: req.body.content, 
  })
  .then(function(newComment) {
    console.log(newComment)
    return res.status(200).json("Post create")
  })
  .catch(function(error) {
    console.log(error)
    return res.status(400).send({ error })
  });
}