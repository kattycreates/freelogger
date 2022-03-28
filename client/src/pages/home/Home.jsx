import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import Jump from '../../components/jumpToTop/Jump'
import axios from 'axios';
import './home.css'

const Home = () => {
  const {search}=useLocation();
  //console.log("search",search);
  
  const [posts,setPosts]=useState([]);
  //console.log("posts",posts);
  useEffect(()=>{
    const getPosts=async()=>{
      try{
        const res=await axios.get('http://localhost:5000/api/posts/'+search);
        setPosts(res.data);
        //console.log(res.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getPosts();
  },[search]);

  return (
    <div className='home'>
        <Header />
        <div className='homeDiv'>
          <Posts posts={posts}/>
          <Sidebar />
        </div>
        <Jump />
        
    </div>
  )
}

export default Home