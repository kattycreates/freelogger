const mongoose=require('mongoose');

const PostSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true
       
    }, 
    username:{
        type:String,
        required:true
        
    },
    categories:{
        type:Array,
        required:true
    },
    postImage:{
        type:String,
        required:false
    }
},{timestamps:true});

/*PostSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.postId=returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})*/

const Post= new mongoose.model('Post',PostSchema);
module.exports=Post;