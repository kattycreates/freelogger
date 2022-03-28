import React from 'react'
import './post.css'
import { Link } from 'react-router-dom'

const Post = ({post}) => {
  const imagePath='/images/';
  return (
    <div className='post'>{post.postImage&&<img className='postImg' src={imagePath+post.postImage} alt="" />}

        
        <div className='postInfo'>
            <div className="postCategories">
              {post.categories.map((cat,index)=>{
                  return <span key={index}>{cat.name}</span>
              })}
            </div>
            <h3 className='postTitle'><Link to={`/post/${post._id}`}>{post.title}</Link></h3>
            <div className="postDate">
                {new Date(post.createdAt).toLocaleString()}
            </div>
            <p className='postDesc'>{post.desc}</p>
        </div>

    </div>
  )
}

export default Post