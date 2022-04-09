import React from 'react'
import './post.css'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  //const imagePath='http://localhost:5000/images/';
  //const imagePath='/images/';
  return (
    <div className='post'>{post.postImage&&<img className='postImg' src={post.postImage} alt="" />}

        
        <div className='postInfo'>
            <div className="postCategories">
              {post.categories.map((cat,index)=>{
                  return <span key={index}><Link to={`/?cat=${cat}`}  className="postCat" ><b>{cat}</b></Link></span>
              })}
            </div>
            <h3><Link to={`/post/${post._id}`} className='postTitle'>{post.title}</Link></h3>
            <span> Author : <Link to={`/?user=${post.username}`}><b>{post.username}</b></Link></span>
            <div className="postDate">
                {new Date(post.createdAt).toLocaleString()}
            </div>
            <p className='postDesc'>{post.desc}</p>
        </div>
        <div className='readDiv'>
        <Link to={`/post/${post._id}`} className='read'>Read</Link>
        </div>

    </div>
  )
}

export default Post