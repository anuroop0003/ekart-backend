const Sellers = require('../db/models/sellerSchema');
const sellerService = require('../services/sellerservice');

module.exports = {
    registerSeller: async (req, res) => {
        try {
            req.body['userId'] = req.payload.userId;
            req.body['status'] = 'pending';
            req.body['isOnboarded'] = true;
            const checkSellerExist = await Sellers.find({gstno: req.body.gstno, regno: req.body.regno, pincode: req.body.pincode });
            console.log("checkSellerExist", checkSellerExist);
            if(checkSellerExist.length < 1 || checkSellerExist == undefined){
                console.log(true);
                await sellerService.sellerRegister(req.body);
                res.status(200).json({
                    message: 'Seller registration completed',
                });   
            }
            else{
                console.log(false);
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
                data: {"status" : sellerData.status, "isOnboarded" : sellerData.isOnboarded, description:sellerData.description}
            });
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },
    ListAllSeller: async (req, res) => {
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
    },
    DeleteSeller: async(req, res) => {
        try {
            const sellerDelete = await sellerService.sellerDelete(req.body);
            if(sellerDelete){
                res.status(200).json({
                    message: 'Seller deleted successfully',
                });
            }
            else{
                res.status(400).json({
                    message: 'Seller delete unsuccessfull',
                });
            }
        } catch (error) {
            
        }
    },
    ApproveSeller: async(req, res) => {
        try {
            const sellerApprove = await sellerService.sellerApprove(req.body);
            if(sellerApprove){
                res.status(200).json({
                    message: 'Seller approved successfully',
                });
            }
            else{
                res.status(400).json({
                    message: 'Seller approved unsuccessfull',
                });
            }
        } catch (error) {
            
        }
    }
};
