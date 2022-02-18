const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user');

//All routes for users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.findOneUser); 
router.post('/profil/:id', auth, multer, userCtrl.update);

module.exports = router;