const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true, // remove space from end & an begining if have
        required: true,
        maxlength: 35
    },
    author: {
        type: String,
        required: true,
        maxlength: 3000
    },
    grade: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 1
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    lang: {
        type: Number,
        default: 50
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    publisher: {
        type: String,
        maxlength: 100
    },
    page: {
        type: Number,
        trim: true,
        maxlength: 1000
    },
    year: {
        type: Number,
        trim: true,
        maxlength: 10
    },
    source: {
        type: String,
        maxlength: 100
    },
    file: {
        type: String,
        default: ""
    }


}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);