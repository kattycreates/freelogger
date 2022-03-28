import React from 'react'
import './posts.css'
import Post from '../post/Post'
const Posts = ({posts}) => {
  
  

  return (
    <div className='posts' id='posts'>
        {posts.map(post=>{
          return <Post key={post._id} post={post}/>
        })}
        
    </div>
  )
}

export default Posts