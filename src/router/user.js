const userController = require('../controller/usercontroller');
const express = require('express');
const { VerifyUser } = require('../middleware/authmiddleware');
const user = express.Router();

user.post('/signup', userController.createUser);
user.post('/profile', VerifyUser, userController.getProfile)

module.exports = user;
