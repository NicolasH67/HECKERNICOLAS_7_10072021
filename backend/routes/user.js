const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//All routes for users
router.post('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

module.exports = router;