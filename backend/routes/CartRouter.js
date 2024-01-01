const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  handleAddToCart,
  handleRemoveFromCart,
  handleFetchFromCart,
  handleIncItemQty,
  handleDecItemQty,
  handleItemQtyChange,
} = require("../controllers/CartController");
const { authCheck } = require("../middlewares/authCheck");
const { roleCheck } = require("../middlewares/roleCheck");
const { checkAdminRole } = require("../middlewares/checkAdminRole");
const { checkUserRole } = require("../middlewares/checkUserRole");
const CartRouter = express.Router();

CartRouter.post("/api/addToCart", authCheck, checkUserRole,handleAddToCart);

CartRouter.post("/api/removeFromCart", authCheck,checkUserRole, handleRemoveFromCart);
CartRouter.get("/api/fetchCart/:userId", authCheck, checkUserRole,handleFetchFromCart);

CartRouter.put("/api/qtyChange", authCheck, checkUserRole,handleItemQtyChange);

module.exports = CartRouter;
