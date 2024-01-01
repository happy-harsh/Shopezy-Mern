const AdminModel = require("../models/AdminModel");
const UserModel = require("../models/UserModel");

const roleCheck = async (req,res,next) => {
    const {uid, aid, uEmail, aEmail, uRole, aRole} = req.decodedToken;


    if(uid){
        const userData = await UserModel.findOne({ userId: uid });
        if(!userData){
            res.status(400).send("User not Found")
        }
        if(userData.role === uRole){
            req.userData = userData;
            next();
        }

    }
    const adminData = await AdminModel.findOne({ adminId: aid });
    if(!adminData){
        res.status(400).send("User not FOund")
    }
    if(adminData.role === aRole){
        req.adminData = adminData;
        next()
    }


}

module.exports = {
    roleCheck
}