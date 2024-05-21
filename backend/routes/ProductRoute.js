const express = require("express");
const { handleInsertDoc, handleAddProduct, handleGetAllProducts, handleDeleteAllProducts, handleDeleteProduct, handleUpdateProduct } = require("../controllers/ProductController");
const { authCheck } = require("../middlewares/authCheck");
const { roleCheck } = require("../middlewares/roleCheck");
const { checkAdminRole } = require("../middlewares/checkAdminRole");

const productRouter = express.Router();
// admin 
productRouter.get('/api/insertDoc',authCheck,handleInsertDoc)

// admin
productRouter.post('/api/addProduct',authCheck,checkAdminRole,handleAddProduct)

// //anyone 
productRouter.get('/api/allProducts',handleGetAllProducts)

// admin
productRouter.delete('/api/deleteAllProducts',authCheck,checkAdminRole,handleDeleteAllProducts)

//admin
productRouter.post('/api/updateProduct/:proId',authCheck,checkAdminRole,handleUpdateProduct)

// admin
productRouter.delete('/api/deleteProduct/:proId',authCheck,checkAdminRole,handleDeleteProduct)

module.exports = productRouter