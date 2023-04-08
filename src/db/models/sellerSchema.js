const mongoose = require('mongoose');
const ObjectId=mongoose.Types.ObjectId
const sellerSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    companyname: {
        type: String,
    },
    regno: {
        type: String,
    },
    gstno: {
        type: String,
    },
    isOnboarded: {
        type: Boolean
    },
    pincode: {
        type: String,
    },
    address: {
        type: String,
    },
    status:{
        type: String
    }
});

const Sellers = mongoose.model('Seller', sellerSchema);

module.exports = Sellers;
