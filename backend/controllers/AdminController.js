const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AdminModel = require("../models/AdminModel");
require("dotenv").config();
const SecureKey = process.env.SK;

const handleAdminCreation = async (req, res) => {
  try {
    const { name, email, password, adminKey } = req.body;

    if (!name || !email || !password || !adminKey) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required!!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashAdminSecKey = await bcrypt.hash(adminKey, salt);
    const hashAdminPass = await bcrypt.hash(password, salt);

    const newUser = {
      adminName: name,
      adminEmail: email,
      adminPassword: hashAdminPass,
      adminSecKey: hashAdminSecKey,
    };

    const admin = await AdminModel.create(newUser);

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Error creating user" });
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword, adminSecKey } = req.body;

    if (!adminEmail || !adminPassword || !adminSecKey) {
      return res.status(400).json({ error: "Please provide email, password, and secret key" });
    }

    const adminData = await AdminModel.findOne({ adminEmail });

    if (!adminData) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(adminPassword, adminData.adminPassword);
    const isSecretKeyValid = await bcrypt.compare(adminSecKey, adminData.adminSecKey);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    if (!isSecretKeyValid) {
      return res.status(400).json({ error: "Invalid Secret Key" });
    }

    const { adminId, role } = adminData;
    const payload = {
      aid: adminId,
      aEmail: adminEmail,
      aRole: role
    };

    const authToken = jwt.sign(payload, SecureKey, { expiresIn: "1hr" });
    res.cookie("jwt", authToken, {
      path: "/",
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      success: true,
      payload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing login" });
  }
};

const handleAdminLogout = async (req, res) => {};

module.exports = {
  handleAdminLogin,
  handleAdminLogout,
  handleAdminCreation,
};
