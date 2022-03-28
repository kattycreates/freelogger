import React,{useRef,useContext} from 'react'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../contexts/Context'
const Login = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const {user,dispatch,isFetching}=useContext(Context);
  const style={
    "textDecoration":"none"
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  dispatch({type:"Login_Start"});
    try{
        const res=await axios.post('http://localhost:5000/api/auth/login',{
            email:emailRef.current.value,
            password:passwordRef.current.value
        });
        dispatch({type:"Login_Success",payload:res.data});
        //console.log(res);
        
      
        
    }
    catch(err){
        dispatch({type:"Login_Failure"});
        console.log(err);
    }

}
//console.log(user);
  return (
    <div className='login'>
        <form className="loginForm" onSubmit={handleSubmit}>
            <h3 className='logInTitle'>Sign In</h3>
            <div className="inputDiv">
                <i className='fa fa-envelope icon'></i>
                <input type="email" className='input-field' placeholder='Email' name='email' ref={emailRef} />
            </div>
            <div className="inputDiv">
                <i className='fas fa-key icon'></i>
                <input type="password" className='input-field' placeholder='Password' name='password' ref={passwordRef}/>
            </div>
            <button className="loginBtn" type='submit' disabled={isFetching}>Sign In</button>
            <span>Or</span>
            <Link to='/register' style={style}>Register</Link>
            
        </form>
        
    </div>
  )
}

export default Login