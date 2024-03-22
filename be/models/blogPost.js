const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    readTime: {
        value: {
               type: Number,
               required: true 
        },
        unit: {
               type: String,
               required: true
        }
    },
    author: {
        name: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        }
    },
    content: {
        type: String,
        required: false
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model('blogPostModel', BlogPostSchema, 'blogPost')