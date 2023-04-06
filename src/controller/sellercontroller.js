const sellerService = require('../services/sellerservice');

module.exports = {
    registerSeller: async (req, res) => {
        try {
            req.body['userId'] = req.payload.userId;
            req.body['status'] = 'pending';
            await sellerService.sellerRegister(req.body);
            res.status(200).json({
                message: 'Seller registration completed',
            });
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
