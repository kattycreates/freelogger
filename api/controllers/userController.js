const User=require('../models/User');
const Post=require('../models/Post');
const bcrypt=require('bcrypt');
const mongoose= require('mongoose');

const updateUser=async(req,res)=>{
    if(req.body._id===req.params.id){
        if(req.body.password)
        {   
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        try{
            const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedUser);
        }
        catch(err){
            res.status(400).json(err);
        }
    }
    else{
        res.status(400).json("No access to update this user details");
    }
   

};

const deleteUser=async (req,res)=>{
    //console.log("user id",req.body);
   // console.log("param id :", typeof(req.params.id));
    //const id=new mongoose.Types.ObjectId(req.params.id);
    //console.log("object id", id);
    if(req.body._id===req.params.id){

        try{
            const user=await User.findById(req.params.id);
            console.log("user :",user);
            try{
                const userPosts= await Post.find({username:{$in:user.username}});
                console.log("user posts",userPosts);
                if(userPosts.length>0){
                    Post.deleteMany({username:{$in:user.username}}).then(()=>{
                        User.findByIdAndDelete(req.params.id).then(()=>{
                            res.status(200).json('Account and posts deleted successfully');
                            console.log("Account and posts deleted successfully!");
                        }).catch((err)=>console.log(err));
                     }).catch((err)=>console.log(err));
                }
                else{
                    User.findByIdAndDelete(req.params.id).then(()=>{
                        res.status(200).json('Account deleted successfully');
                        console.log("Account deleted successfully!");
                    }).catch((err)=>console.log(err));
                }


                
                 

                /* Post.deleteMany({username:{$in:user.username}}).then(()=>{
                        //res.status(200).json('posts deleted successfully');
                        console.log("Posts deleted")
                 }).catch((err)=>console.log(err));
                 */
               
            }
            catch(err)
            {
                res.status(400).json(err);
            }
        }
        catch(err){
            res.status(400).json("User not found");
        }
    }
    else{
        
        res.status(400).json("Cannot delete this account");
    }

};

const getUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {password,...others}=user._doc;
        res.status(200).json(others);
    }
    catch(err){
        res.status(400).json(err);
    }

};

module.exports={updateUser,deleteUser,getUser};