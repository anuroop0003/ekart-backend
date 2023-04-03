const express = require('express');
const seller = express.Router();
const sellerController = require('../controller/sellercontroller');
const { VerifyUser } = require("../middleware/authmiddleware");

seller.post('/register', VerifyUser, sellerController.registerSeller);
seller.post('/check', VerifyUser, sellerController.checkSeller);
seller.post('/list', VerifyUser, sellerController.ListAllSeller);

module.exports = seller;
