const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
require("dotenv").config();
const bcrypt = require("bcryptjs");


// schema
const AdminSchema = new mongoose.Schema({
    adminId: {
        type:String,
        default:()=>nanoid(10)
    },
    role:{
        type:String,
        default:"admin"
    },
    adminName:{
        type:String,
        required:true
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true
    },
    adminPassword:{
        type:String,
        required:true
        
    },
    adminSecKey:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now,
    }
})


// model
// users collection name
const AdminModel = mongoose.model("admins",AdminSchema);
module.exports = AdminModel