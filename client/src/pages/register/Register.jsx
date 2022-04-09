import React,{useState} from 'react'
import './register.css'
import {Link} from 'react-router-dom'
import axios from 'axios';
const Register = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(false);
    const style={
        "textDecoration":"none",
        "fontWeight":700
    };
const handleSubmit=async(e)=>{
    e.preventDefault();
    setError(false);
    try{
        const res=await axios.post('/api/auth/register',{
            username,email,password,profileImg:""
        });
        console.log(res);
        res&&window.location.replace('/login');
    }
    catch(err){
        setError(true);
        console.log(err);
    }
    
}

  return (
    <div className='register'>
        <form className="registerForm" onSubmit={handleSubmit}>
            <h3 className='registerTitle'>Register</h3>
            <div className="inputDivReg">
                <i className='fa fa-user icon'></i>
                <input type="text" className='input-field-reg' placeholder='Username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="inputDivReg">
                <i className='fa fa-envelope icon'></i>
                <input type="email" className='input-field-reg' placeholder='Email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="inputDivReg">
                <i className='fas fa-key icon'></i>
                <input type="password" className='input-field-reg' placeholder='Password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="registerBtn" type='submit'>Register</button>
            <span>Or</span>
            <Link to='/login' style={style}>Sign In</Link>
            {error&&"Something is wrong!"}
        </form>
    </div>
  )
}

export default Register