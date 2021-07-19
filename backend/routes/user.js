import express from 'express';
const router = express.router

import userCtrl from '../controllers/user'; 

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router; 