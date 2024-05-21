const AdminModel = require("../models/AdminModel");
const UserModel = require("../models/UserModel");

const roleCheck = async (req, res, next) => {
    const { uid, aid, uRole, aRole } = req.decodedToken;

    try {
        if (uid) {
            const userData = await UserModel.findOne({ userId: uid });
            if (!userData) {
                return res.status(400).send("User not found");
            }
            if (userData.role === uRole) {
                req.userData = userData;
                return next();
            }
        }

        if (aid) {
            const adminData = await AdminModel.findOne({ adminId: aid });
            if (!adminData) {
                return res.status(400).send("Admin not found");
            }
            if (adminData.role === aRole) {
                req.adminData = adminData;
                return next();
            }
        }

        // If neither user nor admin is found, send an error response
        return res.status(400).send("User or admin not found");
    } catch (error) {
        // Handle any potential errors
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    roleCheck
};
