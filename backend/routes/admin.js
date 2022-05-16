const express = require("express");
const router = express.Router();
const admin = require('../controllers/admin');


const auth = require('../middleware/auth');

// All routes for comments
router.get('/Users', auth, admin.findAllUser);
router.get('/Comment', auth, admin.findAllComment);
router.delete('/Comment/:id', auth, admin.deleteComment);
router.put('/password/:id', auth, admin.changePassword);
router.get('/count/users', auth, admin.countUsers);
router.get('/count/messages', auth, admin.countMessages);
router.get('/count/commentaires/:id', auth, admin.countMessages);

module.exports = router;