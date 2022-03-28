import axios from 'axios';
import { Link } from 'react-router-dom';
import React,{useEffect,useState,useContext} from 'react'
import {useLocation} from 'react-router'
import { Context } from '../../contexts/Context'
import './singlepost.css'

const SinglePost = () => {
const [post,setPost]=useState({});
const [title,setTitle]=useState('');
const [desc,setDesc]=useState('');
const [updateMode,setUpdateMode]=useState(false);
const {user}=useContext(Context);
const location=useLocation();
const path=location.pathname.split('/')[2];
const imagePath='/images/';
//console.log(location);
//console.log(user);
useEffect(()=>{
    try{
        const getPost=async()=>{
            const res=await axios.get('/api/posts/'+path);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc);

        }
        getPost();
    }
    catch(err){
        console.log(err);
    }
    
},[path])

const handleUpdate=async()=>{
    try{
        await axios.put('/api/posts/'+path,{
            username:user.username,title,desc
        });
        setUpdateMode(false);
        window.location.replace('/post/'+path)
    }
    catch(err){
        console.log(err);
    }
   
}

const handleDelete=async()=>{
    if(window.confirm("Delete post permanently?")){
        try{
            await axios.delete('/api/posts/'+path,post);
            window.location.replace('/')
        }
        catch(err){
            console.log(err);
        }
    }
   
   
}


  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
        {post.postImage&&<img className='singlePostImg' src={imagePath+post.postImage} alt="" />}
        {updateMode?(
            <input type="text" className='editTitle' autoFocus={true} value={title} onChange={(e)=>setTitle(e.target.value)}/>
        ):(<><h1>{post.title}
            {user?post.username===user.username&&(<div className="editIcons">
                    <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                </div>):''}
                
            </h1>
            <div className="singlePostInfo">
                <span>
                    Author : <Link to={`/?user=${post.username}`}><b className="singlePostAuthor">{post.username}</b></Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            </>
            )}
        
        {updateMode?(<textarea name="blog" id="blog" className='editText' type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} />)
        : <p className="singlePostDesc">{post.desc}</p>}

        {updateMode&&<div className='btnWrap'><button className="updateBtn" type='submit' onClick={handleUpdate}>Update</button></div> }
       
        </div>
        
    </div>
  )
}

export default SinglePost