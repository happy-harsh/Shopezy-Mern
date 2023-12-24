const express = require("express");
const { body, validationResult } = require("express-validator");
const { handleAdminCreation, handleAdminLogin } = require("../controllers/AdminController");
const adminRouter = express.Router();

adminRouter.post(
  "/api/adminLogin",
  handleAdminLogin
);

adminRouter.post(
  "/api/adminCreation",handleAdminCreation
  
);


adminRouter.get("/api/adminUserLogout",)

module.exports = adminRouter;
