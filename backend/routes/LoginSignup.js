const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  handleSignupUser,
  handleLoginUser,
  handleGetLoggedUser,
  handleLogoutUser,
} = require("../controllers/UserController");
const { authCheck } = require("../middlewares/requireAuth");
const userRouter = express.Router();

// SIGNUP ke liye
userRouter.post(
  "/api/signupUser",
  // express validator
  // [
  //   body("name", "Enter a valid name"),
  //   body("location", "Minimum Length is 5"),
  //   body("email", "Enter Correct Email").isEmail(),
  //   body("password", "Incorrect password"),
  // ],
  handleSignupUser
);

// LOGIN ke liye
userRouter.post(
  "/api/loginUser",
  // [
  //   body("email", "Enter Correct Email").isEmail(),
  //   body("password", "Incorrect password").isLength({ min: 5 }),
  // ],
  handleLoginUser
);

userRouter.get("/api/user",authCheck,handleGetLoggedUser)


userRouter.get("/api/logoutUser",authCheck,handleLogoutUser)

module.exports = userRouter;
