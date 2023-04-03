const express = require('express');
const product = express.Router();
const productController = require('../controller/productcontroller');
const { VerifyUser } = require('../middleware/authmiddleware');

product.post('/add',VerifyUser, productController.addProduct);
product.post('/status',VerifyUser, productController.productStatus);


module.exports = product;
