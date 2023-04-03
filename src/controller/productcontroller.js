const productService= require('../services/productservice');

module.exports = {
  addProduct: async (req, res) => {
    try {
      req.body['userId'] = req.payload.userId;
      console.log("req.payload.userId", req.payload.userId);
      req.body['status'] = 'pending';
      const product = await productService.addProduct(req.body);
      res.status(200).json({
        message: 'Product added successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  productStatus: async (req, res) => {
    try {
        req.body['userId'] = req.payload.userId;
        // req.body['status'] = false;
        const productData = await productService.productCheck(req.body);
        res.status(200).json({
            message: 'Product status fetched',
            data: {"status" : productData.status}
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
},
};
