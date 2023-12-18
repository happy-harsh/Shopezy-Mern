const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

// schema
const UserSchema = new mongoose.Schema({
    userId: {
        type:String,
        default:()=>nanoid(10)
    },
    userName:{
        type:String,
        required:true
    },
    userLocation:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
        unique:true
    },
    userPassword:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    }
})


// model
// users collection name
const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel