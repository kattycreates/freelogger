import React from 'react'
import './post.css'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  //const imagePath='http://localhost:5000/images/';
  //const imagePath='/images/';
  return (
    <div className='post'>
        <div className='postDiv'>
            {post.postImage&&<img className='postImg' src={post.postImage} alt="" />}

            
            <div className='postInfo'>
                
                <h3 className='postTitle'><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
                {post.categories[0]!==''&&<div className="postCategories">
                    <span>Categories:{post.categories.map((cat,index)=>{
                        return <Link to={`/?cat=${cat}`} key={index}  className="postCat" ><b> {cat} </b></Link>
                    })}</span>
                </div>}
                <span> Author : <Link to={`/?user=${post.username}`}><b>{post.username}</b></Link></span>
                <div className="postDate">
                    {new Date(post.createdAt).toLocaleString()}
                </div>
                <p className='postDesc'>{post.desc}</p>
        
            </div>

        </div>
       
        <div className='readDiv'>
        <Link to={`/post/${post._id}`} className='read'>Read</Link>
        </div>
        

    </div>
  )
}

export default Post