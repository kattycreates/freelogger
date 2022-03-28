const mongoose=require('mongoose');

const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

/*CategorySchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})*/

const Category= new mongoose.model('Category',CategorySchema);
module.exports=Category;