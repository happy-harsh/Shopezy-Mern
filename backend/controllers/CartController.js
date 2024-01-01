const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CartModel = require("../models/CartModel");
require("dotenv").config();
const SecureKey = process.env.SK;

const handleAddToCart = async (req, res) => {
  try {
    const { userId, proId, proName, proQty, proFinalPrice } = req.body;

    // Find the cart for the specified user
    let cart = await CartModel.findOne({ userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingProduct = cart.items.find((item) => item.proId === proId);

    if (existingProduct) {
      // If the product already exists, update its quantity or other details
      existingProduct.proQty += proQty;
      existingProduct.proFinalPrice = proFinalPrice;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.items.push({ proId, proName, proQty, proFinalPrice });
    }

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const handleRemoveFromCart = async (req, res) => {
  try {
    const { userId, proId } = req.body;

    // Find the cart for the specified user
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Remove the product from the cart items
    cart.items = cart.items.filter((item) => item.proId !== proId);

    // Save the updated cart
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleFetchFromCart = async (req, res) => {
  try {
    const  userId  = req.params.userId;

    // Find the cart for the specified user
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const handleItemQtyChange = async (req,res) => {
  try {
    const { userId, proId ,proQty, newPrice} = req.body;

    const cartItem = await CartModel.findOneAndUpdate(
      { userId, "items.proId":proId},
      {$set :{
        "items.$.proQty":proQty,
        "items.$.proFinalPrice":newPrice
      }},
      {new:true}
      );
      
      if (!cartItem) {
        return res
          .status(404)
          .json({ success: false, message: "Cart Item not found" });
      }
      
    res
      .status(200)
      .json({ success: true, message: "inc the item qty", cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// const handleDecItemQty = async (req,res) => {
//   try {
//     const { userId, proId ,newPrice} = req.body;

//     const cartItem = await CartModel.findOneAndUpdate(
//       { userId, 'items.proId': proId },
//       { 
//         $inc: { 'items.$.proQty': -1 }, // Increment the quantity by 1
//         $set: { 'items.$.proFinalPrice': newPrice } // Set the new price
//       },
//       { new: true }
//       );
      
//       if (!cartItem) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Cart Item not found" });
//       }
      
//     res
//       .status(200)
//       .json({ success: true, message: "dec the item qty", cartItem });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// }

module.exports = {
  handleAddToCart,
  handleRemoveFromCart,
  handleFetchFromCart,
  handleItemQtyChange
};
