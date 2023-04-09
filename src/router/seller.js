const express = require('express');
const seller = express.Router();
const sellerController = require('../controller/sellercontroller');
const { VerifySeller, VerifyAdmin, VerifyUser } = require("../middleware/authmiddleware");

seller.post('/register', VerifySeller, sellerController.registerSeller);
seller.post('/check', VerifyUser, sellerController.checkSeller);
seller.post('/list', VerifyAdmin, sellerController.ListAllSeller);
seller.post('/delete', VerifyAdmin, sellerController.DeleteSeller);
seller.post('/approve', VerifyAdmin, sellerController.ApproveSeller);

module.exports = seller;
