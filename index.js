const bodyParser = require("body-parser");
const dbConnect = require("./src/config/connect");
const { userRouter, authRouter, productRouter, sellerRouter } = require('./src/router/index')
const cors = require("cors");
const express = require('express')
require("dotenv").config();

const PORT = process.env.PORT
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();


app.use("/user/", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/seller", sellerRouter);

app.listen(parseInt(PORT, 10), function () {
    console.log(`Server listening at  ${PORT}`);
})