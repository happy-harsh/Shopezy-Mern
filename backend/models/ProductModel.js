const mongoose = require("mongoose");
const { nanoid } = require('nanoid');

const ProductSchema = new mongoose.Schema({
    proId: {
        type: String,
        default: () => nanoid(10)
    },
    proImg: {
        type: String,
        required: true
    },
    proName: {
        type: String,
        required: true,
    },
    proDesc: {
        type: String,
        required: true,
    },
    proCat:{
        type: String,
        required:true,
        default:"Medicine"
    }
    ,
    proTag:{
        type: String,
        required:true,
        default:"top50"
    }
    ,
    proQty:{
        type:Number,
        required:true,
        default:10
    }
    ,
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
