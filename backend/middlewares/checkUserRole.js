const UserModel = require("../models/UserModel");


const checkUserRole = async (req, res, next) => {
    const { uid, uRole } = req.decodedToken;

    try {
        if (uid) {
            const userData = await UserModel.findOne({ userId: uid });
            if (userData && userData.role === uRole) {
                req.userData = userData; // Optional: Store admin data in request for future use
                return next(); // Proceed to the next middleware or route handler
            }
        }
        return res.status(403).send("Unauthorized: User role required");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error during role check");
    }
};

module.exports = {
    checkUserRole
};
