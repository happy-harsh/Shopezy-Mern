const express = require("express");
const { handleLoggedRoleDetails } = require("../controllers/GlobalController");
const { authCheck } = require("../middlewares/authCheck");
const { roleCheck } = require("../middlewares/roleCheck");
const globalRouter = express.Router();

globalRouter.get(
  "/api/authStatusRole",authCheck,roleCheck,handleLoggedRoleDetails);

module.exports = globalRouter;
