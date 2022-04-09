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
            <p className="desc">I am Karthika. I am a web developer and digital artist based in Chennai, India. I am also a computer science engineering graduate of batch 2021. I really like building responsive,interactive and colorful websites.</p>
            <p className="desc">This is a blogging site built by me using MERN stack as a part of my learning venture. Feel free to write awesome blogs and provide feedback through the form in contact section.</p>
            <p>Happy blogging!</p>
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
            <a href='https://www.linkedin.com/in/karthika-s-825073223/'><i className="sidebarIcon fab fa-linkedin"></i></a>
            <a href='https://www.instagram.com/mauvflora/'><i className="sidebarIcon fab fa-instagram-square"></i></a>
            <a href='https://twitter.com/kattycreates'><i className="sidebarIcon fab fa-twitter-square"></i></a>

            </div>
        </div>
    </div>
  )
}

export default Sidebar