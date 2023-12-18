const express = require("express");
const { handleInsertDoc, handleAddProduct, handleGetAllProducts, handleDeleteAllProducts } = require("../controllers/ProductController");

const productRouter = express.Router();

productRouter.get('/api/insertDoc',handleInsertDoc)
productRouter.post('/api/addProduct',handleAddProduct)
productRouter.get('/api/allProducts',handleGetAllProducts)
productRouter.delete('/api/deleteAllProducts',handleDeleteAllProducts)

module.exports = productRouter