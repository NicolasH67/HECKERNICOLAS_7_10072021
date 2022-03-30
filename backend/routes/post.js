const express = require("express");
const router = express.Router();
const message = require('../controllers/post');


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// All routes for sauces
router.post('/', auth, multer, message.create);
//router.get('/', auth, multer, message.getAllMessage);

module.exports = router;