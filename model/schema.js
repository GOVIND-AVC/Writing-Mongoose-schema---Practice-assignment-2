const mongoose = require('mongoose')

const userschema =  new mongoose.Schema({
    title:{

        type:String,
        required:true,
        minlength:5
    },
    content:{
        type:String,
    required:true,

        minlength:50
    },
    author:{
        type:String
    },
    tags:{
        type:[String]

    },
    category:{
        type:String,
        default:'General'
    },
    likes: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
        updatedAt: {
        type: Date,
    },
comments: [{
    username: {
    type: String,
    },
    message: {
    type: String,
    required: true,
    },
    commentedAt: {
    type: Date,
    default: Date.now,
        }
    }]

});

const blogpost = mongoose.model('blogpost',userschema);

module.exports=blogpost
