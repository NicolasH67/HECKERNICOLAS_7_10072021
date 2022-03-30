const db = require('../models'); 

exports.create = async (req, res, next) => {
    const userId = req.body.idUSERS; 
    try {
        const user = await db.User.findOne({
            where: {id: userId}
        })
        .then(function() {
            if (req.file === undefined || null) {
                db.Message.create({
                    include: [
                        {
                            model: db.User,
                            attributes: ["id"]
                        },
                    ],
                    idUSERS: req.body.idUSERS,
                    content: req.body.content,
                    like: "0",
                    dislike: "0",
                })
                console.log(db.Message);
                res.status(200).send({ message : "message créer"})
            } else {
                db.Message.create({
                    include: [
                        {
                            model: db.User,
                            attributes: ["id"]
                        },
                    ],
                    idUSERS: req.body.idUSERS,
                    content: req.body.content,
                    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                    like: "0",
                    dislike: "0",
                })
                console.log("message créer avec image");
                res.status(200).send({ message : "message créer"})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }
};

exports.getAllMessage = (req, res, next) => {
    db.Message.findAll()
    .then((messages) => {
        console.log(message)
        return res.status(200).json(messages)
    })
    .catch((error) => {
        console.log( error )
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
        return res.status(404).json({ error })
    })
}
