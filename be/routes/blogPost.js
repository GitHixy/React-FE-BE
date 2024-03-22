const express = require('express');
const router = express.Router();
const BlogPostModel = require("../models/blogPost");
const cloudUpload = require('../cloudConfig');



router.post("/blogPosts/cloudUploadImg", cloudUpload.single('uploadImg'), async (req, res) => {
    try {
        res.status(200).json({source: req.file.path })
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "File upload error",
          });
    }
})

router.get("/blogPosts", async (req, res) =>{
    try {
        const blogPost = await BlogPostModel.find();
        res.status(200).send(blogPost);
      } catch (e) {
        res.status(500).send({
          statusCode: 500,
          message: "Internal server error",
        });
      }
});

router.get("/blogPosts/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const blogPost = await BlogPostModel.findById(id);

        if (!blogPost) {
            return res.status(404).send({
                statusCode: 404,
                message: 'The requested post does not exist!'
            }) 
        }
        res.status(200).send(blogPost)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
});

router.post("/blogPosts", async (req, res) => {
    const newPost = new BlogPostModel(req.body);  
    try {
      const postToSave = await newPost.save();
      res.status(201).send({
        statusCode: 201,
        payload: postToSave,
      });
    } catch (e) {
      res.status(500).send({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  });

router.patch("/blogPosts/:id", async (req, res) => {
    const {id} = req.params;
    

    try {
        const post = await BlogPostModel.findById(id);
        if (!post){
            return res.status(404).send({
                statusCode: 404,
                message: 'The requested post does not exist!'
            })
        }

        const updatedPost = req.body;
        console.log("Updating post with:", req.body);

        const options = {new: true};

        const result = await BlogPostModel.findByIdAndUpdate(id, updatedPost, options);

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
          });
    }
});

router.delete("/blogPosts/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const post = await BlogPostModel.findByIdAndDelete(id);
        if(!post){
            return res.status(404).send({
                statusCode: 404,
                message: 'The requested post does not exist!'
            })
        }

    res.status(200).send(`Post with id ${id} successfully removed!`)
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
          });
    }
});

module.exports = router;