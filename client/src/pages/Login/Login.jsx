import React,{useRef,useContext,useState} from 'react'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../contexts/Context'
const Login = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context);
  const [error,setError]=useState(false);
  const style={
    "textDecoration":"none",
    "fontWeight":700
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  dispatch({type:"Login_Start"});
    try{
      setError(false);
        const res=await axios.post('/api/auth/login',{
            email:emailRef.current.value,
            password:passwordRef.current.value
        });
        dispatch({type:"Login_Success",payload:res.data});
        //console.log(res);
        
      
        
    }
    catch(err){
        dispatch({type:"Login_Failure"});
        setError(true);
        console.log(err);
    }

}
//console.log(user);
  return (
    <div className='login'>
        <form className="loginForm" onSubmit={handleSubmit}>
            <h3 className='logInTitle'>Sign In</h3>
            {error&&<p className='error-msg'>Invalid credentials!</p>}
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