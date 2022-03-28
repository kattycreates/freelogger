import React,{useState,useContext,useEffect} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './settings.css'
import axios from 'axios'
import { useLocation } from 'react-router'
import { Context } from '../../contexts/Context'
const Settings = () => {
  const {user,dispatch}=useContext(Context);
  const [username,setUsername]=useState(user.username);
  const [email,setEmail]=useState(user.email);
  const [password,setPassword]=useState('');
  const [file,setFile]=useState(null);
  const [success,setSuccess]=useState(false);
  const [deleted,setDeleted]=useState(false);
 
  
  
  //console.log(pathLocation);

  
  
  const profilePath='http://localhost:5000/imageProfile/';

  const handleUpdate=async(e)=>{
    e.preventDefault();
    dispatch({type:"Update_Start"});
    let newPost;
    if(password===""){
       newPost={
          _id:user._id,
          username,
          email
        
      };
    }
    else{
      newPost={
        _id:user._id,
          username,
          email,password
        
      };
    }
    if(file){
        console.log("file",file);
        const data=new FormData();
        const filename=new Date().toISOString().replace(/:/g,'-')+file.name;
        data.append('name',filename);
        data.append('file',file);
        newPost.profileImg=filename;
        try{
            await axios.post('http://localhost:5000/api/uploadProfilePic',data);

        }catch(err){}
    } 
    try{
        const res=await axios.put('http://localhost:5000/api/users/'+user._id,newPost);
        setSuccess(true);
        console.log("updated user",res);
        dispatch({type:"Update_Success",payload:res.data});
        
        window.location.replace('/');
    }
    catch(err){
      dispatch({type:"Update_Failure"});
    }
}


  const deleteAccount=(e)=>{
    e.preventDefault();
    if(window.confirm("Deleted account and posts permanently?")){
      try{
       
    
         axios.delete('http://localhost:5000/api/users/'+user._id,{data:{_id:user._id}}).then((res)=>{
          if(res){
            setDeleted(true);

            dispatch({type:"Delete_Success"});
           window.location.replace('/login');
           console.log("posts deleted")
          }
         
        }).catch((err)=>{console.log(err)});
  
        
        
        
    }
    catch(err){
      dispatch({type:"Delete_Failure"});
    }
  
  
    }
    




  }

  const toggleVisibility=(e)=>{
    e.preventDefault();
    let pwdType=document.getElementById('password');
    if(pwdType.type==="password"){
      pwdType.type="text";
    }
    else{
      pwdType.type="password";
    }

  }


  return (
    <div className='settings'>
      <div className="settingsWrapper">
        {success&&<span>Profile has been updated</span>}
        <h2 className="title1">Update your account</h2>
          <form className="settingsForm" onSubmit={handleUpdate}>
              <label>Change profile picture</label>
              <div className="profileSettings">
                  
                  <img src={file?URL.createObjectURL(file):user.profileImg?profilePath+user.profileImg:'assets/defaultProfilePic.png'} alt="user profile" className="proPic" />
                  <label htmlFor="profileInput">
                      <i className='userIcon fas fa-user' title='Upload profile picture'></i>
                  </label>
                  <input type="file" id='profileInput' onChange={(e)=>{setFile(e.target.files[0])}} />
              
              </div>
              <label htmlFor="userName">Username</label>
              <input type="text" id='userName' value={username} onChange={(e)=>setUsername(e.target.value)} />
              <label htmlFor="email">Email</label>
              <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} minLength='6'/>
              <input type='checkbox' onClick={toggleVisibility} />View password
              <button className="updateSubmit" type='submit'>Update</button>

          </form>
          <h2 className="title2">Delete your account</h2>
          <h4 className='warning'><i className='fas fa-exclamation-triangle'></i>Deletion of account is irreversible and leads to permanent removal of your account</h4>
          <button className="deleteAccount" onClick={deleteAccount}>Delete my account</button>
          {deleted&&<span>Account deleted successfully!</span>}
      </div>
     <Sidebar />
      
      
      
        
    </div>
  )
}

export default Settings