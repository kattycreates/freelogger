const User=require('../models/User');
const bcrypt=require('bcrypt');

const register= async (req,res)=>{
    try{
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        const user= new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
            profileImg:req.body.profileImg
        });
        const newUser=await user.save();
        res.status(200).json(newUser);
    }
    catch(err){
       return res.status(400).json(err);
    }
    

};


const login= async (req,res)=>{
    try{
        /*const user= await User.findOne({email:req.body.email});
        !user && res.status(400).json("invalid credentials");
        const validatedUser=await bcrypt.compare(req.body.password,user.password);
        !validatedUser && res.status(400).json('invalid credentials');
        const {password,...others}=user._doc;
        res.status(200).json(others);*/
        const user= await User.findOne({email:req.body.email});
        //console.log("logged user",user);
        if(user===null){
            return res.status(400).json("user not found");
        }
        else{
            const validatedUser=await bcrypt.compare(req.body.password,user.password);
            if(validatedUser===false){
                return res.status(400).json("Invalid password");
            }
            else{
                const {password,...others}=user._doc;
                res.status(200).json(others);
            }
        }
       
      
    }
    catch(err){
        console.log(err);
       return res.status(400).json({err});
        
    }
    

};

module.exports={register,login};