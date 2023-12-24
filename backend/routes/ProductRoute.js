const express = require("express");
const { handleInsertDoc, handleAddProduct, handleGetAllProducts, handleDeleteAllProducts } = require("../controllers/ProductController");
const { authCheck } = require("../middlewares/authCheck");

const productRouter = express.Router();
// admin 
productRouter.get('/api/insertDoc',authCheck,handleInsertDoc)

// admin
productRouter.post('/api/addProduct',handleAddProduct)

// admin as well as user can get all products
productRouter.get('/api/allProducts',handleGetAllProducts)

// only admin can do it
productRouter.delete('/api/deleteAllProducts',handleDeleteAllProducts)

module.exports = productRouter