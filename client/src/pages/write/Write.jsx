import axios from 'axios';
import React,{useState,useContext,useEffect} from 'react'
import './write.css'
import { Context } from '../../contexts/Context';
import {ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import storage from '../../firebase';
const Write = () => {
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [file,setFile]=useState(null);
    const [url,setUrl]=useState('');
    const [cats,setCats]=useState('');
    const [categories,setCategories]=useState([]);
    const [progress,setProgress]=useState(0);
    const [progressShow,setProgressShow]=useState(false);



    useEffect(()=>{
        const getCategories=async()=>{
            const res=await axios.get('/api/categories');
            const cats=res.data.map(cat=>cat.name);
            setCategories(cats);
        };
        getCategories();
    },[])

    

    const {user}=useContext(Context);


   //handle upload to firebase
  
   const handleUpload=()=>{
    if(file!==null){
        setProgressShow(true);
        const fileName=new Date().toDateString().replace(/:/g,"-")+file.name;
        const storageRef=ref(storage,`/images/${fileName}`);
        const uploadTask=uploadBytesResumable(storageRef,file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(uploaded);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrl(url);
          //console.log(data);
                });
            }
        );
     }
     



   }

   //add categories

    const addCategories=async(postCats)=>{
        let catsToAdd=[];
       catsToAdd=postCats.filter(cat=>{
           return !categories.includes(cat);
       })


       const postCategories=async(cat)=>{
        try{
            const res=await axios.post('/api/categories',{name:cat});
            console.log(res);
        }
        catch(err){
            console.log(err);
        }

    };
        console.log("allcategories",categories);
        console.log("postcategories",postCats)
        console.log("cats to add",catsToAdd);
        
        for(let cat in catsToAdd){
            postCategories(catsToAdd[cat])
        }

       



    }



    const handleSubmit=async(e)=>{
        e.preventDefault();
        const catArr=cats.split(',');

        addCategories(catArr);


        const newPost={
            username:user.username,
            title,desc,
            categories:catArr
        };
        if(file){
            /*console.log("file",file);
            const data=new FormData();
            const filename=new Date().toISOString().replace(/:/g,'-')+file.name;
            data.append('name',filename);
            data.append('file',file);
            newPost.postImage=filename;
            try{
                await axios.post('/api/upload',data);

            }catch(err){}*/

            newPost.postImage=url;
        }
        try{
            const res=await axios.post('/api/posts',newPost);
            console.log(res);
            
            window.location.replace('/post/'+res.data._id);
        }
        catch(err){}
    }
  return (
    <div className='write'>
        {file&&<img src={URL.createObjectURL(file)} alt='' className='postBanner' />}
        
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="blogFormGroup1">
                <div className='uploadDiv'>
                    <label htmlFor="blogUpload">
                        <i className="fileIcon fas fa-file-upload fa-2x" title='Upload file'></i>
                    </label>
                    <input type="file" id='blogUpload' className='blogFile' onChange={(e)=>setFile(e.target.files[0])} />
                    <button onClick={handleUpload} className='upload-btn'>Upload</button>
                    { progressShow&&progress<100&& <p>{progress}%</p>}
                    {progressShow&&progress===100&&<i className='check fas fa-check' ></i>}
                </div>
                
                <input type="text" placeholder='Title' className='blogTitle' autoFocus={true} value={title} onChange={(e)=>setTitle(e.target.value)} required/>
            </div>
            <div className="blogFormGroup2">
                <div className="textInput">
                    <textarea name="blog" id="blog" className='blogText' type="text" placeholder="Write your story..." value={desc} onChange={(e)=>setDesc(e.target.value)} required/>
                    <input className='catInput' placeholder='Enter relevant categories separated by commas' value={cats} onChange={(e)=>setCats(e.target.value)}/>
                </div>
                
                <button className="blogSubmit" type='submit'>Publish</button>
            </div>
            
            
            

        </form>
    </div>
  )
}

export default Write