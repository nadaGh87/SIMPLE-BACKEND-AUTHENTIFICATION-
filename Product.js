const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
  
   name:{
      type: String,
      require: true,
    },
    category:  {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,

     required:true
    },
  },
);

module.exports = mongoose.model("Product", productSchema);
