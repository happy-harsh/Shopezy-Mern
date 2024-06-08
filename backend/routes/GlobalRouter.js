const express = require("express");
const { handleLoggedRoleDetails } = require("../controllers/GlobalController");
const { authCheck } = require("../middlewares/authCheck");
const { roleCheck } = require("../middlewares/roleCheck");
const globalRouter = express.Router();

// Made this router to simply get the details of user or admin nothing more

globalRouter.get(
  "/api/authStatusRole",authCheck,roleCheck,handleLoggedRoleDetails);

module.exports = globalRouter;
