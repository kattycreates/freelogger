const Post=require('../models/Post');
const fs=require('fs-extra');

const createPost=async(req,res)=>{
    const post=new Post(req.body);
    //console.log("post",req.body);
    try{
        const newPost=await post.save();
        res.status(200).json(newPost);
    }
    catch(err){
        res.status(400).json(err);
    }
};

const updatePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username)
        {
            
            try{
                const updatedPost= await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true});
                res.status(200).json(updatedPost);
            }
            catch(err){
                res.status(400).json(err);
            }
        }
        else{
            res.status(400).json("You can update only your post!");
        }
       
    }
    catch(err){
        res.status(400).json(err);
    }
    
};

const deletePost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id);
                await fs.remove('images/'+req.body.postImage);
                res.status(200).json("Post deleted successfully");
            }
            catch(err){
                res.status(400).json("You can delete only your post!");
            }
        }
        else{
            res.status(500).json(err);
        }
       
    }
    catch(err){

    }
    
};

const getPost=async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err)
    {
        res.status(400).json(err);
    }

};

const getPosts=async(req,res)=>{
    const name=req.query.user;
    const category=req.query.cat;
    try{
        let posts;
        if(name){
            posts=await Post.find({username:name});
            //console.log(posts);

        }
        else if(category){
            posts=await Post.find({categories:{
                $in:[category]
            }});
            //console.log(posts);
        }
        else{
            posts=await Post.find({});
            //console.log(posts);
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(400).json(err);
    }

};

module.exports={createPost,updatePost,deletePost,getPost,getPosts};