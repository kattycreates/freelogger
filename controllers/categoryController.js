const Category=require('../models/Category');

const postCategory=async(req,res)=>{
    console.log("category",req.body);
    const category=new Category(req.body);
        try{

            const newCategory=await category.save();
            res.status(200).json(newCategory);
    
        }
        catch(err){
            res.status(400).json(err);
        }
    
    
};

const getCategory=async(req,res)=>{
    try{
        const categories=await Category.find({});
        res.status(200).json(categories);

    }
    catch(err){
        res.status(400).json(err);
    }
};

module.exports={postCategory,getCategory};