const jwt = require("jsonwebtoken")
const env= require('dotenv');
env.config()
const secretKey = process.env.SK;
const authCheck = (req,res,next) => {
        // Check if the Cookie header exists
        if (!req.headers.cookie) {
            return res.status(404).send({ message: "No token found" });
        }
    // here the req must also have cookie with it
    const cookies = req.headers.cookie;

    const token  = cookies.split("=")[1];
    // console.log(token)
    if(!token){
        res.status(401).send({message:"no token found"})
    }else{
        jwt.verify(token,secretKey,(err, decodedToken)=>{
            if(err){
                res.status(404).send({message:"jwt is not authentic"})
            }else{
                // console.log(decodedToken);
                // res.send(decodedToken)
                // Passing the decoded Token to the next middleware
                req.decodedToken = decodedToken;
                // console.log(req);
                next();
            }
        })
    }
}

module.exports = {
    authCheck
}