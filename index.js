const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const categoryRoute=require('./routes/categories');
const cors=require('cors');
const path=require('path');
dotenv.config();



app.use(express.json());
app.use(cors());


//app.use("/images", express.static(path.join(__dirname, "images")));
//app.use("/imageProfile", express.static(path.join(__dirname, "imageProfile")));


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(console.log('Connected'))
.catch((err)=>console.log(err));




/*app.use('/api/remove',async(req,res)=>{
    try{
        await fs.remove('images/'+req.postImage);
    }
    catch(err){
        res.status(200).json("Deleted successfully");
    }
    
})*/
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);
app.use(express.static(path.join(__dirname,"client","build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"));
});

app.listen(process.env.PORT||5000,()=>console.log('Running'));
