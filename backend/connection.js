const mongoose  = require("mongoose");

const handleConnectMongoDb = async (uri) => {
    await mongoose.connect(uri).then(()=>{
        console.log("Connected to Mongodb");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = {
    handleConnectMongoDb
}