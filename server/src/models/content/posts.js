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
    }
    });

    module.exports = mongoose.model("Post", Post);


