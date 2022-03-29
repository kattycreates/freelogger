import React from 'react'
import { Link } from 'react-router-dom'
const VerticalNavBar = ({toggle,setToggle,user,logout}) => {
 



  return (
    <div className={toggle?'v-nav-bar v-nav-bar-visible':"v-nav-bar"}>
        <ul className='VList'>
            <li className={toggle?'VListItem-visible':'VListItem'}><Link className='verticalNavHover' onClick={()=>setToggle(!toggle)} to='/'>Home</Link></li>
            <li className={toggle?'VListItem-visible':'VListItem'}><Link className='verticalNavHover' onClick={()=>setToggle(!toggle)} to='/contact'>Contact</Link></li>
            <li className={toggle?'VListItem-visible':'VListItem'}><Link className='verticalNavHover' onClick={()=>setToggle(!toggle)} to='/write'>Write</Link></li>
            {
            user?
            <li className={toggle?'VListItem-visible':'VListItem'}><Link className='verticalNavHover' onClick={logout} to='/'>Logout</Link></li>
            :
            
            <div className="logDiv">
              <ul>
                <li className={toggle?'VListItem-visible ':'VListItem'}><Link className='vlogin' onClick={()=>setToggle(!toggle)} to='/login'>Login</Link></li>
                <li className={toggle?'VListItem-visible':'VListItem'}><Link className='vregister' onClick={()=>setToggle(!toggle)} to='/register'>Register</Link></li>
              </ul>
              
            </div>
            }
            
            
        </ul>
    </div>
  )
}

export default VerticalNavBar