// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
  
  brand: {
        type: String, // This field stores the URL of the product image
        required: true,
      },

    title: {
    type: String,
    required: true,
    trim: true,
  },
  
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  fabric: {
    type: String,
    required: true,
  },
  
  // _id: {
  //   type: Number,
  //   required: true,
  // },
  

  size: {
    type: String,
    required: true,
  },




  // Add more fields as needed for your product model, such as category, images, etc.
});

module.exports = mongoose.model('Product', productSchema);


