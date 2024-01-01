const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String}, // Reference to the user who owns the cart
  items: [
    {
      proId: { type: String},
      proName:{type:String },
      proQty: { type: Number, default: 1 },
      proFinalPrice:{type:Number,default:1}
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
