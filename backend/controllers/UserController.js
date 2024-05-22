const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const SecureKey = process.env.SK;

const handleSignupUser = async (req, res) => {
  try {
    const { name, location, email, password } = req.body;

    if (!password || !name || !location || !email) {
      return res.status(400).json({ success: false, error: "All fields are required!!" });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    const newUser = {
      userName:name,
      userLocation:location,
      userEmail:email,
      userPassword: securePassword,
    };

    const user = await UserModel.create(newUser);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Error creating user" });
  }
};

const handleLoginUser = async (req, res) => {
  try {
    const uEmail = req.body.userEmail;
    const uPassword = req.body.userPassword;

    if (!uEmail || !uPassword) {
      return res.status(400).json({ error: "Please provide email and password" });
    }
    const userData = await UserModel.findOne({ userEmail: uEmail });

    if (!userData) {
      return res.status(400).json({ error: "User not found" });
    }

    const pwdCompare = await bcrypt.compare(uPassword, userData.userPassword);

    if (!pwdCompare) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const { userId, userEmail, role } = userData;
    const payload = {
      uid: userId,
      uEmail: userEmail, 
      uRole: role
    };

    const authToken = jwt.sign(payload, SecureKey, { expiresIn: '1hr' });
    res.cookie('jwt', authToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(200).send({ success: true, Uid: userId, UEmail: userEmail, authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing login" });
  }
};


const handleLogoutUser = (req,res) => {
  try {
    const cookies = req.headers.cookie;
    if (!cookies || !cookies.includes('jwt=')) {
      res.status(404).send({ message: "No token found" });
    } else {
      const token = cookies.split('jwt=')[1].split(';')[0]; // Extract token from cookies
      jwt.verify(token, SecureKey, (err, decodedToken) => {
        if (err) {
          res.status(404).send({ message: "JWT is not authentic" });
        } else {
          // If token is authentic, clear the JWT cookie
          res.clearCookie('jwt');
          res.status(200).send({ message: "Logout successful" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
}

// const handleGetLoggedUser = (req,res) => {
//   // const {uid, email} = req.body;
//   res.status(200).send(req.decodedToken)
// }


module.exports = {
  handleSignupUser,
  handleLoginUser,
  handleLogoutUser
};
