const express = require("express");
const router = express.Router();
const message = require('../controllers/post');


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// All routes for sauces
router.post('/', auth, multer, message.create);
router.get('/', auth, message.getAllMessage);
router.get('/profil/:id', auth, message.AllMessageToUser);
router.get('/:id', auth, message.findOneMessage);
//router.put('/:id', auth, multer, message.update)

//router.delete('/:id', auth, message.dropMessage);
//router.post('/:id/like', auth, message.likeSauce);

module.exports = router;