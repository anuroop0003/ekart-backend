const Sellers = require("../db/models/sellerSchema");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

module.exports = {
    sellerRegister: async (data) => {
        data.userId = new ObjectId(data.userId)
        return await Sellers.updateOne({ userId: data.userId }, data);
    },
    sellerCheck: async (data) => {
        data.userId = new ObjectId(data.userId)
        return await Sellers.findOne({ userId: data.userId});
    },
    ListAll: async () => {
        return await Sellers.find({ isOnboarded: true});
    }
}