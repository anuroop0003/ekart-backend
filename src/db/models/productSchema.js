const mongoose = require('mongoose');
const ObjectId=mongoose.Types.ObjectId

const productSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
},
  productname: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  minprice: {
    type: Number,
    required: true,
  },
  maxprice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Object,
    required: false,
  },
  status:{
    type: String
}
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
