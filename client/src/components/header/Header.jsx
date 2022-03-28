import React from 'react'
import './header.css';


const Header = () => {
  
  return (
    <div className='header' id='header'>
        <div className='search'>
           {/* <img src="assets/food1.jpg" alt=""  className="header-img" />*/}
           <input type="text" className='searchBox' />
           <i className="searchIcon fa fa-search fa-lg"></i>

          
        </div>
    </div>
  )
}

export default Header