const express = require("express");
const router = express.Router();
const message = require('../controllers/post');


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// All routes for sauces
router.post('/', auth, multer, message.create);
router.get('/', auth, multer, message.getAllMessages);
router.get('/:id', auth, multer, message.findOneMessage);
router.put('/:id', auth, multer, message.update);
router.delete('/:id', auth, multer, message.deleteMessage);
router.get('/profil/:id', auth, multer, message.findToUser);
router.get('/profil/:id', auth, multer, message.findToUser);

module.exports = router;