const Products = require('../db/product');

module.exports = {
  addProduct: async (data) => {
    const productExist = await isExist({
      productname: data.productname,
      category: data.category,
      price: data.price,
      price: data.price,
      minprice: data.minprice,
      maxprice: data.maxprice,
    });
    if (productExist) {
      throw { message: 'Product already exist', status: 400 };
    }
    const productDetails = {
      userId: data.userId,
      productname: data.productname,
      image: data.image,
      category: data.category,
      rating: data.rating,
      description: data.description,
      price: data.price,
      minprice: data.minprice,
      maxprice: data.maxprice,
      status: data.status
    };
    return await Products.create(productDetails);
  },
  productCheck : async(data) => {
    const productExist = await isExist({userId: data.userId});
    return productExist;
  }
};

async function isExist(data) {
  return await Products.findOne(data);
}
