import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './sidebar.css'
const Sidebar = () => {
const [cats,setCats]=useState([]);
useEffect(()=>{
    const getCats=async()=>{
        try{
            const res=await axios.get('/api/categories/');
            setCats(res.data);
            //console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
        

    };
    getCats();
},[])
  return (
    <div className='sidebar'>
        <div className="sidebarItem1">
            <h3 className='sidebarTitle'>About me</h3>
            <img className="myPic" src='assets/flowergirl.png' alt=''/>
            <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis neque totam veritatis asperiores beatae aspernatur minus distinctio quae explicabo quas dolorem repudiandae, voluptatibus sequi sit itaque magnam ab cupiditate dicta.</p>
        </div>
        <div className="sidebarItem2">
            <h3 className='sidebarTitle'>Categories</h3>
            <ul className='sidebarList'>
                {cats.map((cat,index)=>{
                    return <Link className='sidebarListItem' key={index} to={`/?cat=${cat.name}`}><li >{cat.name}</li></Link>
                })}
                
            </ul>
        </div>
        <div className="sidebarItem3">
            <h3 className='sidebarTitle'>Get in touch</h3>
            <div className="icons">
            <i className="sidebarIcon fab fa-linkedin"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>

            </div>
        </div>
    </div>
  )
}

export default Sidebar