const express = require("express");
const router = express.Router();
const comments = require('../controllers/comments');


const auth = require('../middleware/auth');

// All routes for comments
router.get('/:id', auth, comments.findByMessage);
router.post('/', auth, comments.createComment);

module.exports = router;