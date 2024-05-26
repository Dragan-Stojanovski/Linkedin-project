const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    }, 
    postTitle: {
        type: String,
        required: true,
    }, 
    postBody: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model("Post", Post);


