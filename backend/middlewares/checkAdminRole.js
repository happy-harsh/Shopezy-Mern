const AdminModel = require("../models/AdminModel");

const checkAdminRole = async (req, res, next) => {
    const { aid, aRole } = req.decodedToken;

    try {
        if (aid) {
            const adminData = await AdminModel.findOne({ adminId: aid });
            if (adminData && adminData.role === aRole) {
                req.adminData = adminData; // Optional: Store admin data in request for future use
                return next(); // Proceed to the next middleware or route handler
            }
        }
        return res.status(403).send("Unauthorized: Admin role required");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error during role check");
    }
};

module.exports = {
    checkAdminRole
};
