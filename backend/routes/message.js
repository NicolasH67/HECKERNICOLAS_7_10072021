const express = require("express");
const router = express.Router();
const message = require('../controllers/message');


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// All routes for sauces
router.post('/', auth, multer, message.create);
router.get('/', auth, message.getAll);
router.get('/:id', auth, message.getOne);
router.put('/:id', auth, multer, message.update)

router.delete('/:id', auth, message.delete);
router.post('/:id/like', auth, message.likeSauce);

module.exports = router;