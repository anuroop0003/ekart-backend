const productsSchema = require('./models/productSchema');

module.exports = {
  async create(data) {
    return await productsSchema.create(data);
  },
  async findOne(data) {
    return await productsSchema.findOne(data);
  },
};
