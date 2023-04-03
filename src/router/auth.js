const express = require('express');
const auth = express.Router();
const authController = require('../controller/authcontroller');

auth.post('/signin', authController.signIn);

module.exports = auth;
