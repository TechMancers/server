const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/forgotPasword', userController.forgotPasword);
router.post('/resetPassword', userController.resetPassword);
router.post('/changePassword', userController.changePassword);




module.exports = router;
   
