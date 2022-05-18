const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const userCtrl = require('../controllers/user');

//All routes for users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil/:id', auth, userCtrl.findOneUser); 
router.put('/profil/:id', multer, userCtrl.update);
router.put('/profil/password/:id', multer, userCtrl.password);
router.delete('/profil/:id', multer, userCtrl.delete);

module.exports = router;