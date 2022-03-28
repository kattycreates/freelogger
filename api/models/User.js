const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true,
    },
    profileImg:{
        type:String,
        required:false
    },
},{timestamps:true});

/*UserSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.userId=returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})*/

const User= new mongoose.model('User',UserSchema);
module.exports=User;