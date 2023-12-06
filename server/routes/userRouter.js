const express = require('express');
const userController = require('../controllers/user/user');
const router = express.Router();

router
   .post('/signup', userController.userSignUp)
   .post('/login', userController.userLogin)
   .get('/verify-user', userController.verifyUser)
   .get('/logout', userController.userLogout)
   .patch('/reset-password', userController.userForgotPassword)
   .get('/get-user-details/:email', userController.getUserDetails);

module.exports = router;