const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require ('../models/Post');

//GET ALL POSTS
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch{
        res.json({message:err});
    }
});

//SUBMITS A POST
router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post.save().then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({messge: err});
    });

});

//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
})

//DELETE POSTS
router.delete('/:postId', async (req, res) => {
    try{
        const removePost = await Post.remove ({_id: req.params.postId});
        res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
});

//UPDATE POSTS
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: {title:req.body.title}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;