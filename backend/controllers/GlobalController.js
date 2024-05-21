const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AdminModel = require("../models/AdminModel");
require("dotenv").config();
const SecureKey = process.env.SK;


// It is used to obtain the details of logged in user

const handleLoggedRoleDetails = async (req, res) => {
    if(req.userData){
        const {userId,role,userEmail} = req.userData;
        const payload = {
            userId,
            role,
            userEmail
        }
        res.status(200).send(payload);
    }else if(req.adminData){
        const {adminId,role,adminEmail} = req.adminData;
        const payload = {
            adminId,
            role,
            adminEmail
        }
        res.status(200).send(payload);
    }
  };
  
  

module.exports = {
    handleLoggedRoleDetails
};
