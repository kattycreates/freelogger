import React,{useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import VerticalNavBar from './VerticalNavBar';
import { Context } from '../../contexts/Context';

const NavBar = () => {
const {user,dispatch}=useContext(Context);
//console.log("user",user)
const [toggle,setToggle]=useState(false);
const imagePath='/imageProfile/';

const toggleClass=(e)=>{
  e.preventDefault();
  setToggle(!toggle);
}
const logout=async(e)=>{
 e.preventDefault();
 await dispatch({type:"Logout"});
 window.location.replace('/login');
};
  return (
    <>
    <div className='navbar'>
      <div className='navItemLeft'>
          <div className="hamburger" onClick={toggleClass}>
            <span className={toggle?"line line1-active":"line"}></span>
            <span className={toggle?"line line2-active":"line"}></span>
            <span className={toggle?"line line3-active":"line"}></span>
          </div>
          <div className="title-desktop">FOOD BLOGGER</div>
      </div>
      <div className='navItemCenter'>
        <div className="title-mobile">FOOD BLOGGER</div>
        <div className="nav">
          <ul>
            <li><Link className='link' to='/'>HOME</Link></li>
            <li><Link className='link' to='/contact'>CONTACT</Link></li>
            <li><Link className='link' to='/write'>WRITE</Link></li>
            {user&&<li className='logout' onClick={logout}>LOGOUT</li>}
          </ul>
        </div>
      </div>
      <div className='navItemRight'>
        {
          user?
        (<div className="profile">
          {/*<img src={user.profileImg!==''?imagePath+user.profileImg:'assets/defaultProfilePic.png'} alt="" className='mobileDP'/>*/}
          <Link to={'/settings'}><img src={user.profileImg!==''?imagePath+user.profileImg:'assets/defaultProfilePic.png'} alt="" /></Link>
        </div>):(
          <ul className='log'>
          <li><Link className='link loginLink' to='/login'>LOGIN</Link></li>
          <li><Link className='link registerLink' to='/register'>REGISTER</Link></li>
        </ul>
        )
}
      </div>
      
    </div>
    <VerticalNavBar toggle={toggle} setToggle={setToggle} user={user} logout={logout} />
    </>
  )
}

export default NavBar