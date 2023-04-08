const Sellers = require('../db/models/sellerSchema');
const sellerService = require('../services/sellerservice');

module.exports = {
    registerSeller: async (req, res) => {
        try {
            req.body['userId'] = req.payload.userId;
            req.body['status'] = 'pending';
            req.body['isOnboarded'] = true;
            const checkSellerExist = await Sellers.find({gstno: req.body.gstno, regno: req.body.regno, pincode: req.body.pincode })
            if(!checkSellerExist){
                await sellerService.sellerRegister(req.body);
                res.status(200).json({
                    message: 'Seller registration completed',
                });   
            }
            else{
                res.status(400).json({
                    message: 'Seller already registered',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    checkSeller: async (req, res) => {
        try {
            req.body['userId'] = req.payload.userId;
            const sellerData = await sellerService.sellerCheck(req.body);
            res.status(200).json({
                message: 'Seller status fetched',
                data: {"status" : sellerData.status}
            });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    ListAllSeller: (async (req, res) => {
        try {
            const sellerData = await sellerService.ListAll(req);
            res.status(200).json({
                message: 'Sellers list fetched',
                data: sellerData
            });
        } catch (error) {
            console.log(error);
            res.status(400).json(error)
        }
    })
};
